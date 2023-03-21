### Hexlet tests and linter status:
[![Actions Status](https://github.com/anilukin/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/anilukin/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c5c42a2ff4a864e0d13/maintainability)](https://codeclimate.com/github/anilukin/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7c5c42a2ff4a864e0d13/test_coverage)](https://codeclimate.com/github/anilukin/frontend-project-46/test_coverage)
[![Node CI](https://github.com/anilukin/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/anilukin/frontend-project-46/actions/workflows/nodejs.yml)
# Вычислитель отличий
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных.

Возможности утилиты:
- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

## Примеры использования:
### *1.1 Сравнение плоских файлов (JSON, yaml, yml)*
Диф строится на основе того, как файлы изменились относительно друг друга, ключи выводятся в алфавитном порядке.
[![asciicast](https://asciinema.org/a/wI65ZterMpgnuK27doVyQDpXM.svg)](https://asciinema.org/a/wI65ZterMpgnuK27doVyQDpXM)

### *1.2 Сравнение файлов, имеющих вложенную структуру*
Диф также строится на основе того, как файлы изменились относительно друг друга, ключи выводятся в алфавитном порядке.
[![asciicast](https://asciinema.org/a/039v7KuV5xlBOOcp7g71D9E2P.svg)](https://asciinema.org/a/039v7KuV5xlBOOcp7g71D9E2P)


### *2.1 Вывод отчета в формате plain*
Возможность заменить формат вывода отчета (по умолчанию формат stylish) на формат plain.
[![asciicast](https://asciinema.org/a/CiMm7s7LUNpnlYeVTaqPMGP01.svg)](https://asciinema.org/a/CiMm7s7LUNpnlYeVTaqPMGP01)

### *2.2 Вывод отчета в json формате*
Вывод дифа в структурированном формате json. Это позволяет другим программам использовать диф для своей работы.
[![asciicast](https://asciinema.org/a/6GGfC7g05IgHrcr2ROaYUcJpE.svg)](https://asciinema.org/a/6GGfC7g05IgHrcr2ROaYUcJpE)
