if [ $# -eq 0 ]
then
    for section in {introduction,preparation}
    do
      output="$(texcount -0 sections/$section/content.tex)"
      for word in $output
      do
          output="$(echo $word+1| bc)"
          echo $section: $output
          break
      done
    done

    output="$(texcount -0 sections/preparation/content.tex sections/introduction/content.tex)"
    for word in $output
    do
        calculate="$word+5"
        output="$(echo $calculate| bc)"
        echo Total: $output
        break
    done
    exit
fi

output="$(texcount -0 sections/$1/content.tex)"
for word in $output
do
    calculate="$word"
    output="$(echo $calculate| bc)"

    if [ $1 == 'preparation' ]
    then
        LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 2500
    fi

    if [ $1 == 'implementation' ]
    then
        LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 5500
    fi

    if [ $1 == 'evaluation' ]
    then
        LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 2500
    fi

    if [ $1 == 'introduction' ]
    then
        LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 800
    fi

    if [ $1 == 'conclusion' ]
    then
        LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 800
    fi
    break
done
