rule Aurora_Training {
 meta:
  description = "Somente treino; nao detecta malware"
 strings:
  $marker = "AURORA_TRAINING"
  $phrase = "simulation only"
 condition:
  all of them
}
