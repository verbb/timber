import { describe, expect, it } from 'vitest';

import { getPrettyPathHtml, getPrettyPathText, markSearchHits } from './format.js';

describe('log formatting', () => {
    it('treats search punctuation literally instead of as a regular expression', () => {
        expect(markSearchHits('Failure at a+b and aab', 'a+b'))
            .toBe('Failure at <mark>a+b</mark> and aab');
    });

    it('escapes a catalog filename before producing display HTML', () => {
        expect(getPrettyPathHtml('/storage/logs/<script>.log', '/storage/logs'))
            .toBe('<span>@storage/logs/</span>&lt;script&gt;.log');
    });
});

it('highlights displayed characters without splitting HTML entities', () => {
    expect(markSearchHits('A &amp; B &lt;tag&gt;', '&'))
        .toBe('A <mark>&amp;</mark> B &lt;tag&gt;');
    expect(markSearchHits('A &amp; B &lt;tag&gt;', '<tag>'))
        .toBe('A &amp; B <mark>&lt;tag&gt;</mark>');
    expect(markSearchHits('A &amp; B', 'amp')).toBe('A &amp; B');
});


it('distinguishes root, nested and external logs with the same basename', () => {
    expect(getPrettyPathText('/app/logs/error.log', '/app/logs')).toBe('@storage/logs/error.log');
    expect(getPrettyPathText('/app/logs/nested/error.log', '/app/logs')).toBe('@storage/logs/nested/error.log');
    expect(getPrettyPathText('/other/error.log', '/app/logs')).toBe('/other/error.log');
    expect(getPrettyPathText('/app/logs-old/error.log', '/app/logs')).toBe('/app/logs-old/error.log');
    expect(getPrettyPathText('/other/error.log')).toBe('/other/error.log');
    expect(getPrettyPathText('C:\\app\\logs\\nested\\error.log', 'C:\\app\\logs')).toBe('@storage/logs/nested/error.log');
    expect(getPrettyPathHtml('/other/<folder>/error.log', '/app/logs')).toBe('<span>/other/&lt;folder&gt;/</span>error.log');
});
