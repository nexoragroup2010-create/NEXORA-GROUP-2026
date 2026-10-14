# Nexora Group — Site institucional

Single page futurista com cenas 3D, animações e gráficos interativos.

**Stack:** Vite · React · TypeScript · Tailwind CSS · Three.js (@react-three/fiber + drei) · Framer Motion · Recharts · Lenis

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em dist/
npm run preview  # serve o build
```

## Estrutura

```
src/
  App.tsx                 # composição das seções + Lenis
  components/
    Loader.tsx            # logo formado por partículas
    Navbar.tsx            # navbar fixa + menu mobile
    Hero.tsx              # hero com planeta 3D
    About.tsx             # missão, visão e valores (tilt 3D)
    Timeline.tsx          # linha do tempo que acende no scroll
    Stats.tsx             # contadores + gráficos (carregado sob demanda)
    Divisions.tsx         # 4 divisões com objetos 3D
    Technology.tsx        # constelação de nós 3D
    Testimonials.tsx      # carrossel
    Contact.tsx           # formulário com validação + mapa
    Footer.tsx
    Background.tsx        # grade + partículas de fundo
    CustomCursor.tsx
    three/                # cenas 3D (lazy loaded)
    ui/                   # Reveal, GlitchText, TypingText, TiltCard, ícones…
  lib/data.ts             # conteúdo do site
```

As cenas 3D são carregadas com `React.lazy`, montadas apenas quando se aproximam da tela
e pausadas quando saem dela. No mobile, a contagem de partículas/geometria é reduzida e os
objetos 3D das divisões são substituídos por ícones com glow.
