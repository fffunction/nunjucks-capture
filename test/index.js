import test from 'ava';
import nunjucks from 'nunjucks';
import CaptureTag from '../index';

test('constructor', t => {
    const newTag = new CaptureTag();
    const expectedKeys = ['tags', 'parse', 'run'];
    const actualKeys = Object.keys(newTag);

    t.deepEqual(actualKeys, expectedKeys, 'object has keys');
});

test('init env', t => {
    const env = new nunjucks.Environment();
    const extName = 'Capture';
    env.addExtension(extName, new CaptureTag());

    t.truthy(env.extensions[extName], 'env has extension');
});

test('render template', t => {
    const env = new nunjucks.Environment();
    env.addExtension('Capture', new CaptureTag());
    const tpl =
        '{% capture as="test" %}test{% endcapture %}{{ test }}{{ test }}{{ test }}';
    t.is(env.renderString(tpl), 'testtesttest');
});

test('fails without "as"', t => {
    const env = new nunjucks.Environment();
    env.addExtension('Capture', new CaptureTag());

    t.throws(() => {
        env.renderString('{% capture %}test{% endcapture %}{{ test }}');
    });
});
