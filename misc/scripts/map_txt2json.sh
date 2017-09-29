#/bin/sh

for a in $(find . -name "*txt");
do
    echo $a;
    export b=$(echo $a | sed "s/^\.\/\(.*\)\.txt/\1/");
    export c=$(echo $b | sed "s/$/.json/");
    echo -e "{\n\t\"name\":\"$b\",\n\t\"data\":" > $c;
    cat $a | tr "\n " "R," | sed "s/R$//" | sed "s/R/],R\t\t[/g" | sed 's/^.*$/\t[\n\t\t[\0]\n\t]\n}\n/g' | sed "s/\([\[,]\)0/\1 /g" | tr "R" "\n" >> $c;
done
