# Node.js + TypeScript 보일러플레이트

TypeScript 기반 Node.js 프로젝트 템플릿입니다. ts-node, ts-jest, ESLint, Prettier가 구성되어 있습니다.

## 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | ts-node로 `src/index.ts` 직접 실행 |
| `npm run build` | `dist` 초기화 후 tsc로 컴파일 |
| `npm run lint` | ESLint 검사 |
| `npm run format` | Prettier로 전체 포맷 적용 |
| `npm run format:check` | Prettier 포맷 검사 (CI용) |
| `npm run test` | Jest 테스트 실행 |
| `npm run test:watch` | Jest watch 모드 |

---

## tsconfig.json

Node.js 런타임에 맞게 구성된 TypeScript 설정입니다.

- `target: "es2023"` — Node.js 최신 LTS가 지원하는 ES2023 문법으로 컴파일합니다.
- `module: "commonjs"` — Node.js의 기본 모듈 시스템인 CommonJS로 출력합니다. `package.json`의 `"type": "module"` 설정과 혼용하지 않도록 주의하세요.
- `moduleResolution: "node"` — Node.js 방식으로 모듈을 해석합니다. (`node_modules` 탐색, 확장자 생략 허용)
- `outDir: "dist"` / `rootDir: "src"` — 소스는 `src/`에 작성하고 컴파일 결과는 `dist/`로 출력합니다.
- `types: ["node", "jest"]` — Node.js 전역 타입(`process`, `Buffer` 등)과 Jest 전역(`describe`, `it`, `expect` 등)을 전역으로 인식합니다.
- `strict: true` — TypeScript 엄격 모드를 활성화합니다. (`strictNullChecks`, `noImplicitAny` 등 포함)
- `erasableSyntaxOnly: true` — 타입 제거만으로 동작하는 문법만 허용합니다. (`enum`, `namespace` 등 런타임 영향 문법 비권장)
- `baseUrl: "."` / `paths: { "@/*": ["src/*"] }` — `@/` 별칭으로 `src/` 하위 경로를 절대 경로처럼 임포트할 수 있습니다.

```ts
import { myUtil } from '@/utils/myUtil' // src/utils/myUtil.ts
```

---

## jest.config.ts

ts-jest를 사용해 TypeScript 파일을 별도 컴파일 없이 직접 테스트합니다.

- `preset: "ts-jest"` — TypeScript 파일을 Jest가 직접 실행할 수 있도록 ts-jest 변환기를 적용합니다. `tsc`로 빌드하지 않아도 테스트가 가능합니다.
- `testEnvironment: "node"` — 브라우저 API 없이 Node.js 환경에서 테스트를 실행합니다.
- `roots: ["<rootDir>/src"]` — `src/` 디렉토리에서만 테스트 파일을 탐색합니다. (`*.test.ts`, `*.spec.ts`)
- `moduleNameMapper` — `tsconfig.json`의 `paths` 별칭(`@/*`)을 Jest 모듈 해석에 동일하게 적용합니다. 이 설정이 없으면 테스트 실행 시 `@/`로 시작하는 임포트를 찾지 못합니다.

---

## eslint.config.js

react 폴더와 동일한 규칙을 적용하며, React 관련 플러그인은 제외됩니다.

### 적용된 플러그인 및 preset

| 플러그인 | 역할 |
|---|---|
| `@eslint/js` | ESLint 기본 추천 규칙 |
| `typescript-eslint` | TypeScript 타입 인식 규칙 |
| `eslint-config-prettier` | Prettier와 충돌하는 ESLint 규칙 비활성화 |
| `eslint-plugin-simple-import-sort` | import/export 알파벳 정렬 |
| `eslint-plugin-unused-imports` | 미사용 import/변수 감지 |

### import 정렬 순서

```
1. Node.js native  →  import fs from 'node:fs'
2. External        →  import express from 'express'
3. Aliases         →  import { myUtil } from '@/utils/myUtil'
4. Relative        →  import { helper } from './helper'
5. Type imports    →  import type { MyType } from '@/types'
```

### 미사용 코드

- 미사용 import → `error` (자동 수정: `eslint --fix`)
- 미사용 변수 → `warn` (단, `_` 접두사 변수는 무시)

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
