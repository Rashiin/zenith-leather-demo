# انتشار دموی ZENITH LEATHER روی GitHub Pages

این پروژه برای GitHub Pages آماده است. با هر push روی شاخه‌ی `main`، تست‌ها اجرا می‌شوند، خروجی استاتیک ساخته می‌شود و نسخه‌ی آنلاین به‌روزرسانی می‌شود.

## ۱. ساخت مخزن

در GitHub یک repository جدید بسازید؛ برای مثال:

```text
zenith-leather-demo
```

اگر حساب رایگان دارید، repository را `Public` انتخاب کنید. سپس از داخل پوشه‌ی پروژه این دستورها را اجرا کنید:

```bash
git init
git add .
git commit -m "Prepare Zenith Leather client demo"
git branch -M main
git remote add origin https://github.com/USERNAME/zenith-leather-demo.git
git push -u origin main
```

به‌جای `USERNAME` نام کاربری GitHub خودتان را قرار دهید.

## ۲. فعال‌کردن Pages

در صفحه‌ی repository بروید به:

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

بعد از اولین اجرای موفق workflow، لینک دمو به این شکل است:

```text
https://USERNAME.github.io/zenith-leather-demo/
```

وضعیت انتشار را در تب `Actions` با workflow به نام **Deploy to GitHub Pages** می‌بینید.

## ۳. به‌روزرسانی دمو

هر بار تغییرات را روی `main` push کنید:

```bash
git add .
git commit -m "Update client demo"
git push
```

GitHub نسخه‌ی جدید را خودکار build و منتشر می‌کند.

## نکات تحویل به مشتری

- لینکی که برای مشتری می‌فرستید همان آدرس `github.io` است؛ لینک `localhost` فقط روی کامپیوتر شما کار می‌کند.
- این دمو فروشگاهی مفهومی است و پرداخت، ثبت سفارش، حساب کاربری و پنل مدیریت ندارد.
- تصاویر و قیمت‌ها نمونه‌اند. قبل از ارائه، این موضوع را به مشتری اعلام کنید.
- GitHub Pages برای نمایش عمومی مناسب است. اگر لینک باید خصوصی و رمزدار باشد، از سرویس میزبانی دارای محافظت دسترسی استفاده کنید.
