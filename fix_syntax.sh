# Remove the inserted lines
sed -i '10195,10219d' app/page.tsx
# Insert it before line 10194
sed -i '10194e cat snippet.txt' app/page.tsx
