"""Gera uma consulta DNS sintética; não acessa a rede."""
from pathlib import Path
import struct, socket
q = b"".join(bytes([len(p)]) + p.encode() for p in "login.aurora.example".split(".")) + b"\0"
dns = struct.pack("!6H", 1, 0x100, 1, 0, 0, 0) + q + struct.pack("!2H", 1, 1)
udp = struct.pack("!4H", 53000, 53, 8 + len(dns), 0) + dns
ip = struct.pack("!BBHHHBBH4s4s", 0x45, 0, 20 + len(udp), 1, 0, 64, 17, 0, socket.inet_aton("192.0.2.10"), socket.inet_aton("192.0.2.53"))
words = struct.unpack("!10H", ip)
s = sum(words)
while s >> 16: s = (s & 65535) + (s >> 16)
ip = ip[:10] + struct.pack("!H", (~s) & 65535) + ip[12:]
packet = bytes.fromhex("0200000000020200000000010800") + ip + udp
header = struct.pack("<IHHIIII", 0xa1b2c3d4, 2, 4, 0, 0, 65535, 1)
record = struct.pack("<IIII", 1700000000, 0, len(packet), len(packet))
Path("labs/aurora/dns.pcap").write_bytes(header + record + packet)
