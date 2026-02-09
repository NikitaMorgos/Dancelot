# Публикация на GitHub

Репозиторий: **https://github.com/NikitaMorgos/Dancelot**

## Команды (выполни в терминале в папке проекта)

Открой PowerShell или cmd в папке `Dancelot` и вставь по очереди:

```powershell
git init
git add .
git commit -m "Initial commit: Dancelot — бот, веб, база рекапов"
git branch -M main
git remote add origin https://github.com/NikitaMorgos/Dancelot.git
git push -u origin main
```

Если Git спросит логин/пароль при `git push`, используй:
- **логин** — твой GitHub username;
- **пароль** — не пароль от аккаунта, а **Personal Access Token**: GitHub → Settings → Developer settings → Personal access tokens → Generate new token (с правом `repo`).

После выполнения код будет в репозитории.
