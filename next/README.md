# Next.js + TypeScript 보일러플레이트

TypeScript 기반 Next.js 프로젝트 템플릿입니다. App Router, Tailwind CSS, ESLint, Prettier가 구성되어 있습니다.

## 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run format` | Prettier로 전체 포맷 적용 |
| `npm run format:check` | Prettier 포맷 검사 (CI용) |

---

## tsconfig.json

Next.js App Router 환경에 맞게 구성된 TypeScript 설정입니다.

- `target: "ES2017"` — 광범위한 브라우저 호환성을 위해 ES2017로 컴파일합니다.
- `lib: ["dom", "dom.iterable", "esnext"]` — 브라우저 DOM API와 최신 ECMAScript 타입을 모두 인식합니다.
- `module: "esnext"` / `moduleResolution: "bundler"` — Next.js가 번들러(Webpack/Turbopack)로 모듈을 처리하므로 번들러 모드를 사용합니다.
- `noEmit: true` — TypeScript는 타입 검사만 수행하고, 실제 컴파일은 Next.js가 담당합니다.
- `jsx: "react-jsx"` — React 17+의 새로운 JSX 변환 방식을 사용합니다. 파일마다 `import React`를 작성하지 않아도 됩니다.
- `isolatedModules: true` — 각 파일을 독립적으로 변환할 수 있어야 합니다. `const enum`이나 네임스페이스 재내보내기 등 단일 파일 변환이 불가능한 문법을 금지합니다.
- `incremental: true` — 이전 빌드 정보를 캐싱해 타입 검사 속도를 높입니다.
- `esModuleInterop: true` — CommonJS 모듈을 ES Module 방식으로 `import`할 수 있게 합니다. (`import fs from 'fs'` 등)
- `resolveJsonModule: true` — `.json` 파일을 타입과 함께 `import`할 수 있습니다.
- `plugins: [{ "name": "next" }]` — VS Code에서 Next.js 전용 타입 추론(서버 컴포넌트, `generateMetadata` 등)을 활성화합니다.
- `paths: { "@/*": ["./*"] }` — `@/`로 프로젝트 루트 기준 절대 경로를 사용할 수 있습니다.

```ts
import Header from '@/components/Header' // <root>/components/Header.tsx
```

---

## next.config.ts

Next.js 동작을 제어하는 설정 파일입니다. `NextConfig` 타입이 적용되어 자동완성과 타입 검사를 지원합니다. 자주 사용하는 옵션은 다음과 같습니다.

```ts
const nextConfig: NextConfig = {
  // 외부 이미지 도메인 허용
  images: {
    domains: ['example.com'],
  },
  // 환경 변수 노출
  env: {
    API_URL: process.env.API_URL,
  },
  // 리다이렉트
  async redirects() {
    return [{ source: '/old', destination: '/new', permanent: true }]
  },
}
```

---

## eslint.config.mjs

`eslint-config-next`를 기반으로, react 폴더와 동일한 추가 규칙을 적용합니다.

### 적용된 플러그인 및 preset

| 플러그인 | 역할 |
|---|---|
| `eslint-config-next/core-web-vitals` | Next.js 권장 규칙 + Core Web Vitals 성능 규칙 |
| `eslint-config-next/typescript` | Next.js TypeScript 전용 규칙 |
| `eslint-plugin-react` | React JSX 규칙 |
| `eslint-config-prettier` | Prettier와 충돌하는 ESLint 규칙 비활성화 |
| `eslint-plugin-simple-import-sort` | import/export 알파벳 정렬 |
| `eslint-plugin-unused-imports` | 미사용 import/변수 감지 |

### import 정렬 순서

```
1. Node.js native  →  import fs from 'node:fs'
2. External        →  import { useState } from 'react'
3. Aliases         →  import Header from '@/components/Header'
4. Relative        →  import styles from './page.module.css'
5. Type imports    →  import type { Metadata } from 'next'
```

### 주요 규칙

- `react/prop-types: off` — TypeScript로 props를 타입 정의하므로 PropTypes 불필요
- `react-hooks/rules-of-hooks: error` — Hook을 조건문·반복문 안에서 호출 시 오류
- `react-hooks/exhaustive-deps: error` — `useEffect` 등의 의존성 배열 누락·과잉 시 오류
- `unused-imports/no-unused-imports: error` — 미사용 import 자동 제거 (`eslint --fix`)

---

## .prettierrc

| 옵션 | 값 | 설명 |
|---|---|---|
| `semi` | `true` | 문장 끝 세미콜론 추가 |
| `singleQuote` | `true` | 문자열에 작은따옴표 사용 |
| `tabWidth` | `2` | 들여쓰기 2칸 |
| `trailingComma` | `"all"` | 가능한 모든 곳에 trailing comma 추가 |
| `printWidth` | `120` | 줄 너비 120자 |
| `arrowParens` | `"always"` | 화살표 함수 인자에 항상 괄호 추가 |
| `plugins` | `prettier-plugin-organize-imports` | 저장 시 import 자동 정렬 및 미사용 import 제거 |

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
