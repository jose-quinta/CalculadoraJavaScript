# Calculadora JavaScript

Calculadora web con modo estándar, conversión decimal/binario y cambio de tema oscuro/claro.

## Características

- **Modo Estándar**: operaciones aritméticas básicas (+, -, *, /) con soporte para expresiones encadenadas
- **Decimal a Binario**: convierte números decimales enteros a su representación binaria
- **Binario a Decimal**: convierte números binarios (solo dígitos 0 y 1) a decimal
- **Tema oscuro/claro**: alterna entre tema oscuro y claro con persistencia en localStorage
- **Soporte de teclado**: todas las operaciones disponibles desde el teclado
- **Manejo de errores**: muestra mensajes claros para división por cero, operandos inválidos, etc.
- **Diseño responsive**: se adapta a diferentes tamaños de pantalla

## Tecnologías

- HTML5
- CSS3 (custom properties, flexbox, media queries)
- JavaScript (ES6+ classes, módulos)

## Arquitectura

El proyecto sigue una arquitectura de separación de responsabilidades en dos capas:

```
Calculator (clase)
├── Estado encapsulado (tokens, currentNumber, error)
├── Lógica de cálculo pura (sin DOM)
├── Métodos: digit, decimal, operator, equals, clearAll, etc.
└── Getters: operation, result

UI Controller (DOMContentLoaded)
├── Instancia Calculator
├── Manejadores de eventos (click, teclado, cambio de modo)
├── Actualización del DOM
└── Persistencia del tema
```

Beneficios de esta arquitectura:
- La lógica de cálculo es independiente del DOM y puede probarse de forma aislada
- El estado está encapsulado y no contaminan el ámbito global
- El código es más mantenible y extensible

## Uso

1. Abre `index.html` en cualquier navegador moderno
2. Usa los botones o el teclado para realizar operaciones
3. Selecciona el modo en el menú desplegable superior
4. Cambia el tema con el botón circular junto al menú

### Atajos de teclado

| Tecla       | Acción                |
|-------------|-----------------------|
| `0` - `9`   | Ingresar dígito       |
| `.`         | Punto decimal         |
| `+` `-` `*` `/` | Operador aritmético |
| `Enter` / `=` | Calcular resultado  |
| `Backspace` | Borrar último dígito  |
| `Escape`    | Reiniciar todo (AC)   |
| `Delete`    | Limpiar entrada (C)   |

## Modos

| Modo                | Descripción                                    |
|---------------------|------------------------------------------------|
| Estándar            | Operaciones aritméticas básicas                |
| Decimal a Binaria   | Convierte un número decimal entero a binario   |
| Binaria a Decimal   | Convierte un número binario (0/1) a decimal    |
| Científica          | En desarrollo                                 |

## Instalación

No requiere instalación ni dependencias. Clona o descarga el repositorio y abre `index.html`.

```bash
git clone <url-del-repositorio>
cd CalculadoraJavaScript
start index.html
```

## Licencia

MIT
