## 📋 Pull Request Checklist

Before submitting this PR, please verify:

- [ ] I have read the [Contributing Guidelines](../CONTRIBUTING.md)
- [ ] I have searched existing PRs to ensure this is not a duplicate
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

---

## 📝 PR Description

### What does this PR do?

Provide a clear and concise description of the changes made.

**Example:**
> This PR adds a new certificate download feature that allows judges to export participant certificates in PDF format directly from the admin dashboard.

### Related Issues

Link to any related issues that this PR addresses:

Fixes #(issue number)
Closes #(issue number)
Relates to #(issue number)

### Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 UI/UX improvement
- [ ] ⚡ Performance improvement
- [ ] 🔧 Code refactoring
- [ ] 🧪 Test improvement
- [ ] 🔒 Security fix

### Screenshots (if applicable)

Add screenshots or screen recordings to help reviewers understand the visual changes:

| Before | After |
|--------|-------|
| ![Before](url) | ![After](url) |

### Testing Performed

Describe the testing you have performed:

- [ ] Manual testing in browser
- [ ] Mobile responsive testing
- [ ] Database operations tested
- [ ] API endpoints tested
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated

**Test Results:**
```
Describe the test results and any issues found
```

### Environment Details

- **OS**: [e.g., Windows 11, macOS 14, Ubuntu 22.04]
- **Browser**: [e.g., Chrome 120, Firefox 121]
- **Node Version**: [e.g., 18.17.0]

### Database Changes

- [ ] No database changes
- [ ] New migrations added
- [ ] Existing migrations modified
- [ ] Seed data updated

**If database changes exist, describe them:**
```
List any new collections, schema changes, or seed updates
```

### API Changes

- [ ] No API changes
- [ ] New endpoints added
- [ ] Existing endpoints modified
- [ ] Breaking API changes

**If API changes exist, document them:**
```
GET /api/new-endpoint
POST /api/modified-endpoint
```

### Deployment Notes

- [ ] No special deployment steps required
- [ ] Requires environment variable changes
- [ ] Requires database migration
- [ ] Requires cache clear

**Deployment instructions:**
```
Any special steps needed for deployment
```

---

## 👥 Reviewer Notes

### Areas for Review Focus

Please pay special attention to:
- [ ] Specific file or function
- [ ] Performance implications
- [ ] Security considerations
- [ ] Edge cases handled

### Known Issues/Limitations

List any known issues or limitations with this implementation:
- Issue 1
- Issue 2

### Future Improvements

List any planned follow-up improvements:
- Improvement 1
- Improvement 2

---

## ✅ Pre-Merge Checklist

- [ ] All CI checks pass
- [ ] Code review approved by at least one maintainer
- [ ] Documentation updated (if needed)
- [ ] CHANGELOG.md updated (if needed)
- [ ] No merge conflicts

---

## 🙏 Thank You

Thank you for contributing to TechBlitz 2026! Your efforts help make this hackathon platform better for everyone.

---

**Maintainer Use Only:**

- [ ] Approved
- [ ] Changes Requested
- [ ] Needs Testing
- [ ] Merge Conflicts

**Merge Strategy:**
- [ ] Squash and Merge
- [ ] Rebase and Merge
- [ ] Create Merge Commit
