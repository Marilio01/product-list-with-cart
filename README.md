# Lista de Produtos com Carrinho 🛒

🎉 Uma aplicação de carrinho de compras moderna, desenvolvida em TypeScript para o desafio Frontend Mentor Product List with Cart. Permite navegar por produtos, adicionar itens ao carrinho, gerenciar pedidos e confirmar compras com uma interface responsiva e elegante!

## Principais Funcionalidades

### Listagem Dinâmica de Produtos

* ✅ Exibe uma grade de produtos (ex.: sobremesas) carregados de `src/data.json`.
* 🖼️ Cada produto inclui imagem, categoria, nome e preço, com layout em cards modernos.
* 📱 Suporta imagens em vários formatos (thumbnail, mobile, tablet, desktop) para responsividade.

### Adicionar ao Carrinho

* ➕ Adiciona produtos ao carrinho com um clique no botão "Adicionar ao Carrinho".
* 🔢 O botão alterna para um contador, permitindo ajustar quantidades (+/-).
* ✨ Feedback visual (borda vermelha na imagem) indica produtos adicionados.

### Gerenciamento do Carrinho

* 📦 Mostra itens com nomes, quantidades, preços unitários e totais.
* 🗑️ Permite remover itens com um botão de exclusão.
* 🔄 Atualiza contagem de itens e valor total em tempo real.
* ⚖️ Alterna entre "carrinho vazio" e conteúdo do carrinho automaticamente.

### Modal de Checkout

* 🖱️ Botão "Confirmar Pedido" abre um modal com itens, quantidades e total.
* 🔄 Opção "Iniciar Novo Pedido" limpa o carrinho e reinicia a interface.
* 📜 Lista rolável para pedidos extensos, com design limpo e intuitivo.

### Design Responsivo

* 🖥️ Adapta-se a diferentes telas com CSS grid e media queries.
* 📱 Em dispositivos móveis (≤ 375px), usa layout de coluna única e modal ajustado.
* 🖼️ Imagens mantêm proporções em todos os dispositivos.

## Principais Características

### TypeScript para Segurança

* ✅ Usa TypeScript com tipos definidos (`src/types/product.ts`) e estrutura modular.
* 📂 Separa lógica em pastas: tipos, modelos (`src/models/Product.ts`), interface (`src/ui/UI.ts`) e utilitários (`src/utils/dom.ts`).

### Tecnologias Modernas

* ⚡ Construído com Vite para desenvolvimento rápido e builds otimizados.
* 📦 Usa módulos ES para organização e compatibilidade com navegadores.

### Estilização Personalizada

* 🖌️ Usa fontes Red Hat Text (Regular, SemiBold, Bold) para tipografia elegante.
* 🌈 Esquema de cores com variáveis CSS (ex.: `--Rose-100`, `--Red`) para consistência.
* ✨ Inclui transições suaves, efeitos de hover e botões arredondados.

### Tratamento de Erros

* 🛠️ Gerencia erros em carregamento de JSON, consultas DOM e interações.
* 📜 Registra avisos para dados inválidos ou elementos ausentes.

### Acessibilidade

* 📏 Usa HTML semântico (`main`, `section`, `aside`) para leitores de tela.
* ⌨️ Botões e elementos interativos são acessíveis por teclado com estados visuais claros.