
function! Compile()
		let extension = expand('%:e')
		if extension == "ms"
				execute "! groff -ms % -T pdf > /tmp/op.pdf"
		elseif extension == "tex"
				execute "! pandoc -f latex -t latex % -o /tmp/op.pdf"
		elseif extension == "md"
				execute "! pandoc % -s -o /tmp/op.pdf"
		endif
endfunction


echo '.PS
box wid 3 "My first ASCII box"
arrow down 1 from last box.s
box wid 3 "My first ASCII box"
.PE' | pic | groff -ms -Tascii


man ls | groff -mandoc 


# Header

.NH 5
.NH 4
.NH 3
.NH 2
.NH 1

.TL # title
.AU # author
.ND #date

```
s/title:/\.TL\n/
s/author:/\.AU\n/
s/date:/\.ND\n/
s/institution:/\.AI\n/

s/\\begin{abstract}/\.AB/
s/\\end{abstract}/\.AE/

s/^\#####.\(.*\)/\.NH 5\n\1\n\.PP/g
s/^\####.\(.*\)/\.NH 4\n\1\n\.PP/g
s/^\###.\(.*\)/\.NH 3\n\1\n\.PP/g
s/^\##.\(.*\)/\.NH 2\n\1\n\.PP/g
s/^\#.\(.*\)/\.NH 1\n\1\n\.PP/g

s/\*\*\*\(.*\)\*\*\*$/\n\.BI\ \"\1\"\ /g
s/\*\*\*\(.*\)\*\*\*\(.\)$/\n\.BI\ \"\1\"\ \"\2\"/g
s/\*\*\*\(.*\)\*\*\*\(.\)/\n\.BI\ \"\1\"\ \"\2\"\n/g

s/\*\*\(.*\)\*\*$/\n\.B\ \"\1\"\ /g
s/\*\*\(.*\)\*\*\(.\)$/\n\.B\ \"\1\"\ \"\2\"/g
s/\*\*\(.*\)\*\*\(.\)/\n\.B\ \"\1\"\ \"\2\"\n/g

s/\*\(.*\)\*$/\n\.I\ \"\1\"\ /g
s/\*\(.*\)\*\(.\)$/\n\.I\ \"\1\"\ \"\2\"/g
s/\*\(.*\)\*\(.\)/\n\.I\ \"\1\"\ \"\2\"\n/g

s/`\(.*\)`$/\n\.CW\ \"\1\"\ /g
s/`\(.*\)`\(.\)$/\n\.CW\ \"\1\"\ \"\2\"/g
s/`\(.*\)`\(.\)/\n\.CW\ \"\1\"\ \"\2\"\n/g

s/^\ ...............-\ /.IP\ \\(bu\ 10\n/g
s/^\ ...........-\ /.IP\ \\(bu\ 8\n/g
s/^\ .......-\ /.IP\ \\(bu\ 6\n/g
s/^\ ...-\ /.IP\ \\(bu\ 4\n/g
s/^-\ /.IP\ \\(bu\ 2\n/g
s/^\ .*-\ /.IP\ \\(bu\ 12\n/g
```
