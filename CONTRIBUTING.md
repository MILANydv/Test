# Contributing to Referral Management SaaS

Thank you for your interest in contributing to the Referral Management SaaS! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/project.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit your changes
7. Push to your fork
8. Open a Pull Request

## Development Setup

See [README.md](README.md) for setup instructions.

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type when possible
- Use functional components with hooks

### React Components

```typescript
// Preferred component structure
import React from 'react';
import { ComponentProps } from './types';

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing component patterns
- Use the `cn()` utility for conditional classes
- Keep components responsive

### State Management

- Use React Query for server state
- Use React Context for global client state
- Use local state (useState) for component-specific state

### Forms

- Use react-hook-form for form handling
- Use zod for validation schemas
- Provide clear error messages

## Git Commit Messages

Format: `type(scope): subject`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(campaigns): add campaign creation form
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

## Pull Request Process

1. Update documentation if needed
2. Add tests if applicable
3. Ensure all tests pass
4. Update the CHANGELOG.md
5. Request review from maintainers

### PR Title Format

Use the same format as commit messages:
`type(scope): description`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing done

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows project style
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors
```

## Testing

- Write unit tests for utilities
- Write integration tests for API endpoints
- Test in both English and Nepali languages
- Test on mobile and desktop

## Documentation

- Update README.md for feature changes
- Add JSDoc comments for complex functions
- Update API documentation
- Add inline comments for complex logic

## Translation

When adding new text:

1. Add to `src/i18n/locales/en.json`
2. Add corresponding Nepali translation to `src/i18n/locales/ne.json`
3. Use translation keys in components: `t('key.path')`

## Database Changes

When modifying the database schema:

1. Update `prisma/schema.prisma`
2. Run `npm run prisma:generate`
3. Create migration: `npm run prisma:migrate`
4. Document changes in PR

## API Changes

When adding/modifying API endpoints:

1. Update route handlers in `src/server/routes/`
2. Add proper error handling
3. Update API documentation
4. Add authentication middleware if needed

## Component Guidelines

### Shared Components

Place in `src/components/shared/`:
- Button
- Input
- Card
- Badge
- etc.

### Feature Components

Place in `src/components/[feature]/`:
- Feature-specific components
- Should be reusable within the feature

### Page Components

Place in `src/pages/[feature]/`:
- Top-level page components
- Route-specific components

## File Naming

- React components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatCurrency.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- Types: PascalCase (e.g., `UserTypes.ts`)

## Import Order

```typescript
// 1. React and third-party libraries
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal modules
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/lib/utils';

// 3. Components
import Button from '@/components/shared/Button';
import UserCard from '@/components/users/UserCard';

// 4. Types
import type { User } from '@/types';

// 5. Styles (if any)
import './styles.css';
```

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
