cat << 'INNER_EOF' > snippet_tags.txt
                      <p className="text-xs text-[#6B6053]">Use {'{date}'} and {'{time}'} placeholders to automatically insert the user's selected date and time.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeAdminTab === 'performance' && (() => {
INNER_EOF

sed -i -e '/<p className="text-xs text-\[#6B6053\]">Use {.*} placeholders to automatically insert the user.* selected date and time.<\/p>/,/{activeAdminTab === '"'"'performance'"'"' && (() => {/c\
'"$(cat snippet_tags.txt | tr '\n' '\r' | sed -e 's/\r/\\n/g')"'
' app/page.tsx
