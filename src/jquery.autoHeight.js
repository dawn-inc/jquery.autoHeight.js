/*!
 * jquery.autoHeight.js
 *
 * Author: DAWN Inc.
 * Since:   2017-03-20
 * Update:  2017-03-25
 * Version: 1.0.1
 * License: MIT (http://www.opensource.org/licenses/mit-license.php, http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license)
 * Comment: 右記を参考に作成(https://github.com/tinybeans/jQueryAutoHeight)
 */
(function($) {
    'use strict';

    /**
     * 要素の高さを揃えるメソッド
     * @param  {Object|String} opts オプションのオブジェクト または 'reset' という文字列
     * @param  {Number} [1] opts.column いくつごとに高さを揃えるか。0または1の場合、すべて同じ高さに揃える
     * @param  {Boolean} [false] opts.reset 高さを揃える前にインラインスタイルを解除するかどうか
     * @param  {Boolean} [false] opts.minHeight min-heightで揃えるかどうか
     * @return {jQuery} autoHeight()を適用したjQueryオブジェクト自身を返す
     */
    $.fn.autoHeight = function(opts) {
        /**
         * 変数の宣言と代入
         */
        var cssProp,
            heights = [],
            maxInRows = [],
            propNameToTrack = $.fn.autoHeight.propNameToTrack;

        if (opts === 'reset') {
            /**
             * 揃えていたインラインCSSプロパティを解除
             */
            this.css($.data(this, propNameToTrack, cssProp), '');

            /**
             * 揃えていたCSSプロパティ名のキャッシュを削除
             */
            $.removeData(this, propNameToTrack);

            /**
             * jQueryオブジェクトをチェーンして終了
             */
            return this;
        }

        /**
         * デフォルトのオプションと、引数のオプションを統合して、実際に使用するオプションを生成
         */
        opts = $.extend({}, $.fn.autoHeight.defaults, opts);

        /**
         * 揃える高さのCSSプロパティ名をキャッシュ
         */
        cssProp = opts.minHeight ? 'minHeight' : 'height';

        /**
         * 高さを揃える前に、インラインスタイルを解除する
         */
        if (opts.reset) {
            this.css(cssProp, '');
        }

        /**
         * 各要素のheightを配列に格納
         */
        this.each(function(i) {
            heights[i] = $(this).height();
        });

        if (opts.column <= 1) {
            /**
             * 一番大きいheightをすべての要素に適用
             */
            this.css(cssProp, Math.max.apply(null, heights));
        } else {
            /**
             * opts.columnが2以上の場合、その数ごとに一番大きいheightを配列に格納
             */
            for (
                var i = 0, j = heights.length;
                i < Math.ceil(j / opts.column);
                i++
            ) {
                var x = i * opts.column;

                maxInRows.push(
                    Math.max.apply(null, heights.slice(x, x + opts.column))
                );
            }

            /**
             * 各行をループ
             */
            for (var k = 0, l = maxInRows.length; k < l; k++) {
                /**
                 * 行の各要素にCSSを適用
                 */
                for (var m = 0; m < opts.column; m++) {
                    this.eq(k * opts.column + m).css(cssProp, maxInRows[k]);
                }
            }
        }

        /**
         * 揃えたCSSプロパティ名を、あとで`destroy`できるようにキャッシュ
         */
        $.data(this, propNameToTrack, cssProp);

        /**
         * jQueryオブジェクトをチェーンして終了
         */
        return this;
    };

    /**
     * デフォルト設定
     */
    $.fn.autoHeight.propNameToTrack = '_autoHeightCSSProp';
    $.fn.autoHeight.defaults = {
        column: 1,
        reset: false,
        minHeight: false
    };
})(jQuery);
