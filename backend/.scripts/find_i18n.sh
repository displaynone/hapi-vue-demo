find . -name '*.js' -not -path "./node_modules/*" -exec grep '__(.*)' {} \; | sed s/__\(/~/ | cut -d "~" -f2 | cut -d ")" -f1 | sed s/\'/\"/g | sort | uniq -u
