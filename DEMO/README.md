# Smart Shopping — Scanner de preços, carrinho com promoções e conferência com NFC-e

Aplicativo (demo web em **React + Vite + Tailwind**) para **acompanhar compras em tempo real**: escaneia produtos/etiquetas, **aplica promoções**, calcula o total previsto, **compara com a NFC-e** e destaca divergências. Inclui **lista de compras inteligente** (fuzzy-match), **estimativas por loja** com data e **relatórios**.

> 🔧 **Status**: Demo front-end. OCR, leitura de QR/NFC-e e histórico de preços usam *stubs/dados simulados* — prontos para plugar no backend no MVP.

---

## ✨ Principais recursos

- **Scan (Scanner)**
  - Simulação de OCR/EAN com **Confiança da IA**.
  - **Preço por unidade** (L/kg) e alerta implícito de **variação de tamanho** (ex.: 2 L → 1,5 L).
  - **Produtos recentes** e **Dicas** de captura visíveis na tela do scanner.

- **Carrinho**
  - **Motor de promoções** com cálculo e prioridade.
  - **15% OFF em Grãos** calculado **sobre o total do carrinho** (não apenas sobre os itens da categoria).
  - **“Leve 3, pague 2”** aparece **mesmo com 1 unidade** (mostrado como **pendente** e explica o que falta).
  - **Estimativa em outras lojas** com **data** de atualização e **diferença em valor**:
    - `-R$ x,xx` (**verde**) quando mais barato
    - `+R$ x,xx` (**vermelho**) quando mais caro
    - Exibe distância e avaliação ⭐️.

- **Lista de Compras**
  - **Fuzzy-match**: marca automaticamente itens similares ao adicionar no carrinho (ex.: “arroz” ↔ “Arroz Tio João Tipo 1 5 kg”).
  - Organização por **corredores** (Massas & Grãos, Laticínios, etc).
  - *Foi removida a receita “Lasanha”* conforme solicitado.

- **Comparar (NFC-e)**
  - Mostra **apenas os itens divergentes**, ordenados pelo **maior valor de diferença**.
  - Banner: **⚠️ Você pagou R$ x,xx a mais!** / **✅ a menos!**
  - Lista as **promoções aplicadas** e alerta possíveis **promoções não aplicadas** na nota.

- **Relatórios (aba separada)**
  - **Insights inteligentes**: economia do mês, precisão média, loja favorita, meta mensal, etc (apenas nesta aba).

---

## 🧠 Motor de promoções

**Tipos suportados**
1. `buy_x_get_y` — *Leve 3, Pague 2* (mostra pendente; dica do que falta).
2. `percentage_discount` — *% OFF* (**global** sobre o total do carrinho, com valor mínimo e presença de item elegível).
3. `second_unit_discount` — *2ª unidade com % OFF*.

**Prioridade de aplicação**  
Controlada por `priority` (ex.: `percentage_discount` ≥ `second_unit_discount` ≥ `buy_x_get_y`).

**Promoções pendentes**  
Sempre exibidas com **hint** (ex.: “Faltam 2 un.” ou “Faltam R$ 10,00 para atingir o mínimo”).

---

## 🏗️ Stack e estrutura

- **React 18**, **Vite**, **Tailwind CSS**, **lucide-react** (ícones).
- Estado via Hooks; *shopping list* persiste em `localStorage`.

```
smart-shopping/
├─ index.html
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ src/
│  ├─ main.jsx
│  ├─ SmartShoppingApp.jsx
│  ├─ index.css
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ ScanTab.jsx
│  │  ├─ CartTab.jsx
│  │  ├─ ListTab.jsx
│  │  ├─ CompareTab.jsx
│  │  └─ ReportsTab.jsx
│  ├─ lib/
│  │  ├─ utils.js          # currency, normalize, corredores, fuzzy-match
│  │  └─ promotions.js     # apply/explain/compute/hints
│  ├─ data/
│  │  └─ mock.js           # catálogo, promoções, lojas, stats
│  └─ dev-tests.js         # testes rápidos no console
└─ README.md
```

---

## 🚀 Como rodar

### Requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+

### Instalação e desenvolvimento
```bash
npm install
npm run dev
# abra http://localhost:5173/
```

### Build de produção
```bash
npm run build
npm run preview
```

---

## 🔌 Integrações (MVP → produção)

- **Leitor de EAN / OCR**
  - EAN: `zxing-js/browser`, `QuaggaJS`.
  - OCR etiqueta: `Tesseract.js` (com pré-processamento: binarização/contraste).
- **NFC-e / QR**
  - Ler QR → SEFAZ (HTML/XML) → parse (descrição, EAN, qtd., unit., total, descontos).
  - Considerar que descontos podem vir por linha ou agregados.
- **Histórico de preços por loja**
  - Backend salva `{ean, storeId, price, timestamp}`.
  - UI mostra **último preço** e **data**; sempre como **estimativa**.
- **Integração com app de gastos**
  - Enviar NFC-e + relatório de divergências ao finalizar compra.

---

## 🧩 Lógica relevante

### Fuzzy-match da lista
- Normaliza (`lowercase`, sem acentos, sem pontuação).
- Casa por **token** ≥ 3 caracteres dentro do **nome** do produto ou **marca**.
- Ao adicionar no carrinho, marca e pode mover o item “concluído” para o final.

### Estimativas por loja
- `estimate = total * priceIndex`
- Diferença exibida como **valor absoluto**:
  - **Verde**: `-R$ x,xx` (mais barato)
  - **Vermelho**: `+R$ x,xx` (mais caro)
- Exibe distância, ⭐, **data** (`lastUpdated`).

### Comparação com NFC-e (simulada)
- Classificação por item: `match` | `minor_divergence` | `major_divergence`.
- Lista **apenas divergências** (ordem descrescente de diferença).
- Banner com **diferença total** e seção de promoções aplicadas/não aplicadas.

---

## 🧪 Testes rápidos (no console)

Valide as principais regras diretamente no navegador:

```js
// Com o app aberto
window.__runDevTests()
```

Confere:
- `percentage_discount` = **15% do total do carrinho**.
- Fuzzy-match da lista para “arroz” e “detergente”.

---

## 🔒 Privacidade

- Trate **CPF na NFC-e** como **dado sensível**.
- Persistir **apenas dados estruturados** no MVP; fotos com retenção curta.
- Logs **sem** dados pessoais.

---

## ♿ Acessibilidade

- Alto contraste, áreas de toque adequadas, labels claros.
- Preparado para i18n (strings centralizáveis futuramente).

---

## 🩺 Troubleshooting

- **Only one default export allowed per module**
  - Cada arquivo `.jsx` deve ter **um** `export default`.
- **Erro com `or`**
  - Em JS use `||` (ex.: `a || b`), nunca `or`.
- **Tela em branco**
  - Abra exatamente `http://localhost:5173/`.  
  - Porta ocupada? `npm run dev -- --port=5174`.
- **Node desatualizado**
  - Use Node 18+; limpe a cache: `rm -rf node_modules && npm install`.

---

## 📱 Android (PWA/Capacitor)

- **PWA**: adicionar `manifest.json`, ícones e `service worker`.
- **Capacitor**:
  ```bash
  npm run build
  npx cap init smart-shopping com.suaempresa.smartshopping
  npx cap add android
  npx cap copy
  npx cap open android
  ```
  Conceder permissão de **câmera**.

---

## 🗺️ Roadmap

- OCR offline robusto (etiqueta) + EAN variável (itens a peso).
- Parser NFC-e por UF com tolerâncias configuráveis.
- Conta/backup e sync multi-dispositivo.
- Exportar **PDF** de divergências.
- Fuzzy com TF-IDF/embeddings (melhor recall).
- Tema alto contraste + TTS.

---

## 🔧 Scripts

```bash
npm run dev       # desenvolvimento
npm run build     # build de produção
npm run preview   # preview do build
```

---

## 📄 Licença
