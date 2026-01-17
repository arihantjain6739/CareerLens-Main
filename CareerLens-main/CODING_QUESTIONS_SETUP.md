# Technical Interview Coding Questions Setup

## Overview
The technical interview session now supports both conceptual questions and coding challenges with full details including:
- Problem description
- Constraints
- Example inputs/outputs
- Test cases to verify solutions
- Starter code templates
- Hints

## Seeding the Static Coding Question

A static "Two Sum" coding challenge has been prepared with 6 comprehensive test cases.

### To seed the coding question:

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the seeding script:
```bash
npm run seed:coding
```

This will add the "Two Sum" coding challenge to your database with:
- ✅ Full problem description
- ✅ 4 constraints
- ✅ 3 examples with explanations
- ✅ 6 test cases with expected outputs
- ✅ Starter code template
- ✅ 3 helpful hints

## Features

### For Coding Questions:
- **Problem Statement**: Clear description of the coding challenge
- **Difficulty Level**: Easy/Medium/Hard badge
- **Tags**: Topics like array, hash-table, etc.
- **Constraints**: Input size limits and conditions
- **Examples**: Sample inputs and expected outputs with explanations
- **Test Cases**: Multiple test cases to validate solutions
- **Code Editor**: Built-in textarea for writing code
- **Hints**: Progressive hints (can be toggled on/off)
- **Starter Code**: Pre-filled function template

### For Conceptual Questions:
- Standard interview question format
- Speech synthesis for question reading
- Timer and progress tracking
- Video recording capabilities

## UI Enhancements

### Coding Question Display:
- 💻 Code editor with syntax highlighting placeholder
- 📝 Formatted examples in blue boxes
- ⚠️ Yellow constraint boxes for visibility
- ✅ Green test case cards with details
- 💡 Collapsible hint system
- Reset code button to restore starter template

### Sidebar Information:
- Difficulty badge (color-coded)
- Topic tags
- Scrollable content for long questions
- All test cases visible at once
- Examples with full explanations

## Adding More Coding Questions

To add more coding questions, create them in the format shown in `backend/scripts/seedCodingQuestion.js`:

```javascript
{
  question: "Problem Title",
  type: "coding",
  difficulty: "easy|medium|hard",
  tags: ["array", "string"],
  description: "Full problem description...",
  constraints: ["constraint 1", "constraint 2"],
  examples: [
    {
      input: "example input",
      output: "example output",
      explanation: "why this works"
    }
  ],
  testCases: [
    {
      input: "test input",
      expectedOutput: "expected result",
      explanation: "test explanation"
    }
  ],
  starterCode: "function template...",
  hints: ["hint 1", "hint 2"]
}
```

## Testing

After seeding, navigate to `/tech-interview-session` in the frontend to see:
1. The coding question with all details
2. Code editor for writing solutions
3. All test cases displayed
4. Hints that can be revealed
5. Example inputs and outputs

## Next Steps

You can:
- Add more coding questions following the same pattern
- Implement code execution/validation
- Add syntax highlighting for the code editor
- Create a submission system
- Track which test cases pass/fail
