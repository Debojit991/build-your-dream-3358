# Contributing Workflow

Here is the exact workflow you should follow to safely update the repository without losing your work:

### 1. Sync with Remote (Crucial)
Before you try to push, you must pull the latest changes from the remote branch to avoid conflicts or rejected pushes. Run this in your terminal inside the project folder:

```bash
# Fetch and merge the latest changes from the main branch
git pull origin main
```
> **Note:** If you have modified files that were also changed on the remote, Git may prompt you to resolve merge conflicts. You will need to open the conflicting files, choose the correct code versions, save, and then continue the process.

### 2. Stage and Commit Changes
Once you have successfully pulled and resolved any potential conflicts, stage and commit your local work:

```bash
# Stage all changes
git add .

# Commit with a clear message
git commit -m "Added [feature name or fix description]"
```

### 3. Push to GitHub
Now that your local history is in sync with the remote repository, you can push your changes:

```bash
# Push the changes to the main branch
git push origin main
```

---

## Pro-Tips for the Team

* **Avoid Main:** To prevent constant merge conflicts, we strongly encourage team members to work on separate branches for their specific features (e.g., `git checkout -b feature-user-auth`). You can then push those branches and open a Pull Request in GitHub to merge your code safely into `main` after a quick review.
* **Verification (Permission Denied):** If you encounter a "Permission Denied" error, it means your local Git configuration might still be using an old credential or an unlinked account. You can check which account you are using by running `ssh -T git@github.com` (if using SSH) or checking your local credential manager.
