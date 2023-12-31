# question-data.json

過去問題のJSONです。
データは以下の通りです。

```
{
  "year": "試験が開催された年度",
  "timeframe": "開催された時間帯。'am' | 'pm'",
  "link": "過去問題のリンク",
  "questionList": [
    {
      "num": "問題番号",
      "statement": "問題文",
      "options": "選択肢",
      "img": "画像ファイル名。画像がないときは空文字"
    }
  ],
  "answerList": [
    ["問題の解答番号。値は 1-5 で、数は1つか2つ"]
  ]
}
```
