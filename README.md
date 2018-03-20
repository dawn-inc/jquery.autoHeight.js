# jquery.autoHeight.js

jQueryオブジェクトに含まれる要素のheightまたはmin-heightを最大値で揃えるプラグイン

## 使用方法

```js
// 基本形

$('.sample').autoHeight();
```

```js
// optionsを指定する場合

$('.sample').autoHeight({
    minHeight: true
});

$('.sample').autoHeight({
    column: 4
});

$('.sample').autoHeight({
    reset: true
});
```

```js
// 高さ揃えを解除する場合

var $sample = $('.sample').autoHeight();
$sample.autoHeight('reset');
```

## オプション設定

### options (object)

高さ揃えに関する設定

以下の3つをプロパティとしてもつ

#### minHeight (true/false)

揃える高さをmin-heightにするかどうか

#### column (number)

要素何個ごとに高さを揃えるか

#### reset (true/false)

高さを揃える前に、height(min-height)のインラインスタイルを解除するかどうか

0または1の場合は、該当の要素すべての最大値で揃える

### reset (string)

引数が文字列で'reset'であるとき、すでに高さ揃えが適用されていた場合、該当のインラインスタイルを解除する

すでに高さ揃えが適用されているかどうかは、

jQueryオブジェクトに $.fn.autoHeight.propNameToTrack のプロパティが存在するかで判定する

## デフォルト設定

下記にて変更できる

```js
// optionsのデフォルト設定
$.fn.autoHeight.defaults = {
    column: 1,
    reset: false,
    minHeight: false
}

// 'reset'をかける場合に判定するプロパティ名
$.fn.autoHeight.propNameToTrack = '_autoHeightCSSProp';
```


## ライセンス

[MIT License](https://raw.githubusercontent.com/bhargavrpatel/gulp-prettier/master/LICENSE)
