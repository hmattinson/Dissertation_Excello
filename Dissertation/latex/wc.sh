if [ $# -eq 0 ]
then
    for chapter in {introduction,preparation,implementation,evaluation,conclusion}
    do
      # output="$(texcount -0 chapters/$chapter/content.tex)"
      output="$(texcount -1 -utf8 -sum -inc chapters/$chapter/content.tex)"
      for word in $output
      do
          output="$(echo $word+1| bc)"
          echo $chapter: $output
          break
      done
    done

    output="$(texcount -1 -utf8 -sum -inc chapters/introduction/content.tex chapters/preparation/content.tex chapters/implementation/content.tex chapters/evaluation/content.tex chapters/conclusion/content.tex)"
    for word in $output
    do
        calculate="$word+5"
        output="$(echo $calculate| bc)"
        echo Total: $output
        break
    done
    exit
fi

# output="$(texcount -0 chapters/$1/content.tex)"
# for word in $output
# do
#     calculate="$word"
#     output="$(echo $calculate| bc)"
#
#     if [ $1 == 'preparation' ]
#     then
#         LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 2500
#     fi
#
#     if [ $1 == 'implementation' ]
#     then
#         LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 5500
#     fi
#
#     if [ $1 == 'evaluation' ]
#     then
#         LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 2500
#     fi
#
#     if [ $1 == 'introduction' ]
#     then
#         LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 800
#     fi
#
#     if [ $1 == 'conclusion' ]
#     then
#         LC_NUMERIC=en_US printf "%'.f / %'.f\n" $output 800
#     fi
#     break
done
