import { describe, expect, it } from 'vitest';

import { getPrettyPathHtml, markSearchHits } from './format.js';

describe('log formatting', () => {
    it('treats search punctuation literally instead of as a regular expression', () => {
        expect(markSearchHits('Failure at a+b and aab', 'a+b'))
            .toBe('Failure at <mark>a+b</mark> and aab');
    });

    it('escapes a catalog filename before producing display HTML', () => {
        expect(getPrettyPathHtml('/storage/logs/<script>.log'))
            .toBe('<span>@storage/logs/</span>&lt;script&gt;.log');
    });
});
