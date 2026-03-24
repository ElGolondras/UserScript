# ✨ ElGolondras GitHub FX — UserScript

> Efectos visuales animados en el perfil de GitHub: partículas flotantes, efecto Matrix, cursor personalizado y avatar animado con glow.

---

## 📋 ¿Qué hace este script?

Cuando visitas tu perfil de GitHub, el script añade automáticamente:

| Efecto | Descripción |
|--------|-------------|
| 🌊 **Partículas flotantes** | Puntos azules conectados con líneas que flotan por toda la página |
| 💻 **Efecto Matrix** | Caracteres japoneses y código cayendo en pantalla completa |
| 🖱️ **Cursor personalizado** | Anillo exterior suave + punto azul brillante |
| ✨ **Avatar animado** | Tu GIF personalizado con efecto pulso/glow azul |

---

## 🔧 Requisitos

- **Google Chrome**, **Firefox**, **Edge** o cualquier navegador compatible
- Extensión **Tampermonkey** instalada

---

## 🚀 Instalación paso a paso

### Paso 1 — Instalar Tampermonkey

Instala la extensión según tu navegador:

- 🟡 **Chrome** → [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- 🟠 **Firefox** → [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/)
- 🔵 **Edge** → [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

Una vez instalada verás el icono de Tampermonkey en la barra del navegador:

```
🟤 ← Este icono aparecerá en tu barra de extensiones
```

---

### Paso 2 — Crear el script

1. Haz clic en el icono de **Tampermonkey** en la barra del navegador
2. Selecciona **"Create new script"** (o "Nuevo script")
3. Se abrirá un editor con código de ejemplo — **borra todo** el contenido

---

### Paso 3 — Pegar el script

1. Descarga o abre el archivo `ElGolondras_GitHub_FX.user.js`
2. Copia todo el contenido
3. Pégalo en el editor de Tampermonkey
4. Pulsa **Ctrl + S** (o Cmd + S en Mac) para guardar

Debería verse así en la cabecera del script:

```javascript
// ==UserScript==
// @name         ElGolondras GitHub FX
// @match        https://github.com/UserName
// ...
// ==/UserScript==
```

---

### Paso 4 — Subir tu GIF al repositorio

Para que el avatar animado funcione, sube tu GIF al repo de perfil:

1. Ve a `github.com/UserName/Username` (En caso de no tener este repositorio, crearlo)
2. Haz clic en **Add file** → **Upload files**
3. Sube tu GIF con el nombre exacto: **`avatar.gif`**
4. Haz clic en **Commit changes**

> ⚠️ El nombre debe ser exactamente `avatar.gif` o el script no lo encontrará.

La URL del GIF quedará así:
```
https://raw.githubusercontent.com/UserName/UserName/main/avatar.gif
```

---

### Paso 5 — Verificar que está activo

1. Ve a tu perfil de GitHub — la URL es `https://github.com/TU_USUARIO`
   (reemplaza `TU_USUARIO` por tu nombre de usuario de GitHub)
2. Recarga la página con **F5**
3. Deberías ver los efectos inmediatamente

Para confirmar que el script está activo, haz clic en el icono de Tampermonkey — debería mostrar **"1"** indicando que hay un script ejecutándose en esa página.

---

## ⚙️ Personalización

### Cambiar la opacidad del Matrix

Abre el script en Tampermonkey y busca esta línea:

```javascript
opacity: 0.18;
```

Cámbiala a un valor entre `0.05` (casi invisible) y `0.5` (muy visible).

### Cambiar la velocidad del pulso del avatar

Busca esta línea:

```javascript
avatar.style.animation = 'avatarPulse 2s ease-in-out infinite';
```

Cambia `2s` por más segundos para hacerlo más lento o menos para más rápido.

### Cambiar los colores (azul → otro color)

El color principal es `37,99,235` (azul). Puedes reemplazarlo por otro en formato RGB:

| Color | Valor RGB |
|-------|-----------|
| 🔵 Azul (por defecto) | `37,99,235` |
| 🟢 Verde | `34,197,94` |
| 🟣 Morado | `139,92,246` |
| 🔴 Rojo | `239,68,68` |
| 🟠 Naranja | `249,115,22` |

Usa **Ctrl + H** en el editor para reemplazar todos los valores a la vez.

### Usar un GIF diferente

Busca esta línea en el script:

```javascript
const GIF_URL = 'https://raw.githubusercontent.com/UserName/UserName/main/avatar.gif';
```

Reemplaza la URL por la de tu nuevo GIF.

---

## 🛑 Desactivar el script temporalmente

Si quieres desactivarlo sin borrarlo:

1. Haz clic en el icono de **Tampermonkey**
2. Busca **"ElGolondras GitHub FX"**
3. Haz clic en el toggle para desactivarlo

Para volver a activarlo repite el proceso.

---

## ❓ Problemas frecuentes

**Los efectos no aparecen**
- Asegúrate de estar en `https://github.com/UserName` exactamente
- Comprueba que el script está activado en Tampermonkey
- Recarga la página con **Ctrl + Shift + R** (recarga forzada)

**El avatar no se anima**
- Verifica que el archivo se llama exactamente `avatar.gif` en el repo
- Comprueba que el repo es público
- Espera unos segundos tras subir el GIF para que GitHub lo procese

**El cursor ha desaparecido**
- El script reemplaza el cursor por defecto. Si algo falla, desactiva el script desde Tampermonkey

**Los efectos van lentos**
- Reduce el número de partículas buscando `PARTICLE_COUNT = 90` y bajándolo a `50`
- Reduce la velocidad del Matrix cambiando `setInterval(drawMatrix, 45)` a `setInterval(drawMatrix, 80)`

---

## 📁 Archivos

```
ElGolondras_GitHub_FX.user.js   ← Script principal para Tampermonkey
README.md                        ← Esta guía
avatar.gif                       ← Tu GIF animado (súbelo al repo de perfil)
```

---

<div align="center">

Hecho por **ElGolondras** · Solo se ejecuta en tu navegador · Tus datos no salen a ningún lado

</div>
