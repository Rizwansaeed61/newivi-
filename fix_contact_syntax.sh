# Remove lines 88 to 118
sed -i '88,118d' app/contact/page.tsx
# Insert it before line 87 (which is return ()
sed -i '86r snippet_submit.txt' app/contact/page.tsx
