// tests adapted from
// http://svn.apache.org/repos/asf/sling/trunk/bundles/engine/src/test/java/org/apache/sling/engine/impl/request/SlingRequestPathInfoTest.java

var  getPathInfo = function (link) {
    return function () {
        SlingAwesome.URL.getPathInfo(link);
    }
}

QUnit.test( "URL.decompose Test Null or Empty Resource", function( assert ) {
    assert.throws(getPathInfo(), Error, "test no function parameter");
    // empty string
    assert.throws(getPathInfo(""), Error, "empty string test");
    // undefined
    var a = undefined;
    assert.throws(getPathInfo(a), Error, "undefined string test");
});


QUnit.test( "URL.decompose Test Trailing Dot http://localhost:4502/some/path/.", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/.");
    assert.equal(urlInfo.resourcePath, "/some/path", "Resource path is /some/path");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.ok(_.isEmpty(urlInfo.suffix), "Suffix is null");
});


QUnit.test("URL.decompose Test Trailing Dot With Suffix http://localhost:4502/some/path/./suffix", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/./suffix");
    assert.equal(urlInfo.resourcePath, "/some/path", "Resource path is /some/path");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.equal(urlInfo.suffix, "/suffix", "Suffix is /suffix");
});

QUnit.test("URL.decompose Test Trailing Dot Dot", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/..");
    assert.equal(urlInfo.resourcePath, "/some/path", "Resource path is /some/path");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.ok(_.isEmpty(urlInfo.suffix), "Suffix is null");
});

QUnit.test( "URL.decompose Test Trailing Dot Dot With Suffix", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/../suffix");
    assert.equal(urlInfo.resourcePath, "/some/path", "Resource path is /some/path");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.equal(urlInfo.suffix, "/suffix", "Suffix is /suffix");
});


QUnit.test( "URL.decompose Test Trailing Dot Dot Dot", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/...");
    assert.equal(urlInfo.resourcePath, "/some/path", "Resource path is /some/path");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.ok(_.isEmpty(urlInfo.suffix), "Suffix is null");
});

QUnit.test( "URL.decompose Test Trailing Dot Dot Dot With Suffix", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/.../suffix");
    assert.equal(urlInfo.resourcePath, "/some/path", "Resource path is /some/path");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.equal(urlInfo.suffix, "/suffix", "Suffix is /suffix");
});

QUnit.test("URL.decompose Test All Options", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path.print.a4.html/some/suffix");
    assert.equal(urlInfo.resourcePath, "/some/path", "Resource path is /some/path");
    assert.equal(urlInfo.selectorString, "print.a4", "Selector String is print.a4");
    assert.equal(urlInfo.selectors.length, 2, "Selector array length is 2");
    assert.equal(urlInfo.selectors[0], "print", "selector[0] is print");
    assert.equal(urlInfo.selectors[1], "a4", "selector[1] is a4");
    assert.equal(urlInfo.extension, "html", "Extension is html");
    assert.equal(urlInfo.suffix, "/some/suffix", "Suffix is /some/suffix");
});

QUnit.test("URL.decompose Test All Empty (url with /)", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/");
    assert.equal(urlInfo.resourcePath, "/", "Resource path is /");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.ok(_.isEmpty(urlInfo.suffix), "Suffix is null");
});

QUnit.test("URL.decompose Test All Empty (url has no trailing /)", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502");
    assert.equal(urlInfo.resourcePath, "/", "Resource path is /");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.ok(_.isEmpty(urlInfo.suffix), "Suffix is null");
});

QUnit.test("URL.decompose Test Path Only", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/here");
    assert.equal(urlInfo.resourcePath, "/some/path/here", "Resource path is /");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.ok(_.isEmpty(urlInfo.extension), "Extension is null");
    assert.ok(_.isEmpty(urlInfo.suffix), "Suffix is null");
});

// TODO
// this is behaving differently in a static environment
// and on Apache Sling. In Apache Sling /some/path/here.html can be a resource.
// In a static environment it is always /some/path/here as resource and .html as its
// extension. perhaps the decompose function is wrong and should always check against
// "a resource" what ever "a resource" might be...
QUnit.test("URL.decompose Test Path With Extension Only", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/here.html");
    assert.equal(urlInfo.resourcePath, "/some/path/here", "Resource path is /");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.equal(urlInfo.extension, "html", "Extension is html");
    assert.ok(_.isEmpty(urlInfo.suffix), "Suffix is null");
});

// skip this test because it is not possible to apply to static environment
/*
 RequestPathInfo p = new SlingRequestPathInfo(new MockResource(
 "/some/path/here", ".html"));
 assertEquals("/some/path/here", p.getResourcePath());
 assertNull("Selectors are null",p.getSelectorString());
 assertEquals(0, p.getSelectors().length);
 assertEquals("html", p.getExtension());
 assertNull("Suffix is null",p.getSuffix());
 */

QUnit.test("URL.decompose Test Path And One Selector Only", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/here.print.html");
    assert.equal(urlInfo.resourcePath, "/some/path/here", "Resource path is /some/path/here");
    assert.equal(urlInfo.selectorString, "print", "Selector String is print.a4");
    assert.equal(urlInfo.selectors.length, 1, "Selector array length is 1");
    assert.equal(urlInfo.selectors[0], "print", "selector[0] is print");
    assert.equal(urlInfo.extension, "html", "Extension is html");
    assert.ok(_.isEmpty(urlInfo.suffix), "Suffix is null");
});

QUnit.test("URL.decompose Test Path Ext And Suffix", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path/here.html/something");
    assert.equal(urlInfo.resourcePath, "/some/path/here", "Resource path is /some/path/here");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.equal(urlInfo.extension, "html", "Extension is html");
    assert.equal(urlInfo.suffix, "/something", "Suffix is /something");
});

QUnit.test("URL.decompose Test Selectors Split", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/some/path.print.a4.html/some/suffix");
    assert.equal(urlInfo.resourcePath, "/some/path", "Resource path is /some/path");
    assert.equal(urlInfo.selectors.length, 2, "Selector array length is 2");
    assert.equal(urlInfo.selectorString, "print.a4", "Selector String is print.a4");
    assert.equal(urlInfo.selectors[0], "print", "selector[0] is print");
    assert.equal(urlInfo.selectors[1], "a4", "selector[1] is a4");
    assert.equal(urlInfo.extension, "html", "Extension is html");
    assert.equal(urlInfo.suffix, "/some/suffix", "Suffix is /some/suffix");
});

// skip not valid for static environment  (for now at least)
/*
 RequestPathInfo p = new SlingRequestPathInfo(new MockResource(
 "/some/path", ".print.a4.html/some/suffix"));
 assertEquals("/some/path", p.getResourcePath());
 assertEquals("print.a4", p.getSelectorString());
 assertEquals(2, p.getSelectors().length);
 assertEquals("print", p.getSelectors()[0]);
 assertEquals("a4", p.getSelectors()[1]);
 assertEquals("html", p.getExtension());
 assertEquals("/some/suffix", p.getSuffix());
 }
 */

// skip not valid for static environment (for now at least)
/*
 RequestPathInfo p = new SlingRequestPathInfo(new MockResource(
 "/some/path.print", ".a4.html/some/suffix"));
 assertEquals("/some/path.print", p.getResourcePath());
 assertEquals("a4", p.getSelectorString());
 assertEquals(1, p.getSelectors().length);
 assertEquals("a4", p.getSelectors()[0]);
 assertEquals("html", p.getExtension());
 assertEquals("/some/suffix", p.getSuffix());
 */

// skip not valid for static environment (for now at least)
/*
 equestPathInfo p = new SlingRequestPathInfo(new MockResource(
 "/some/path.print.a4", ".html/some/suffix"));
 assertEquals("/some/path.print.a4", p.getResourcePath());
 assertNull("Selectors are null",p.getSelectorString());
 assertEquals(0, p.getSelectors().length);
 assertEquals("html", p.getExtension());
 assertEquals("/some/suffix", p.getSuffix());
 */

QUnit.test("URL.decompose Test Dots Around Suffix", function( assert ) {
    var urlInfo = SlingAwesome.URL.decompose("http://localhost:4502/libs/foo/content/something/formitems.json/image/vnd/xnd/knd.xml");
    assert.equal(urlInfo.resourcePath, "/libs/foo/content/something/formitems", "Resource path is /libs/foo/content/something/formitems");
    assert.equal(urlInfo.extension, "json", "Extension is json");
    assert.ok(_.isEmpty(urlInfo.selectorString), "Selectors are null");
    assert.equal(urlInfo.selectors.length, 0, "Selector array length is 0");
    assert.equal(urlInfo.suffix, "/image/vnd/xnd/knd.xml", "Suffix is /image/vnd/xnd/knd.xml");
});

//skip these tests for now
/**
  public void testJIRA_250_a() {
        RequestPathInfo p = new SlingRequestPathInfo(new MockResource(
            "/bunkai", ".1.json"));
        assertEquals("/bunkai", p.getResourcePath());
        assertEquals("json", p.getExtension());
        assertEquals("1", p.getSelectorString());
    }

 public void testJIRA_250_b() {
        RequestPathInfo p = new SlingRequestPathInfo(new MockResource("/",
            ".1.json"));
        assertEquals("/", p.getResourcePath());
        assertEquals("json", p.getExtension());
        assertNull("Suffix is null",p.getSuffix());
        assertEquals("Selector string must not be null", "1",
            p.getSelectorString());
    }

 public void testJIRA_250_c() {
        RequestPathInfo p = new SlingRequestPathInfo(new MockResource("/",
            ".1.json/my/suffix"));
        assertEquals("/", p.getResourcePath());
        assertEquals("json", p.getExtension());
        assertEquals("/my/suffix", p.getSuffix());
        assertEquals("Selector string must not be null", "1",
            p.getSelectorString());
    }

 public void testJIRA_250_d() {
        RequestPathInfo p = new SlingRequestPathInfo(new MockResource("/",
            ".json"));
        assertEquals("/", p.getResourcePath());
        assertEquals("json", p.getExtension());
        assertNull("Suffix is null",p.getSuffix());
        assertNull("Selectors are null",p.getSelectorString());
    }


 public void testMerge() {
        SlingRequestPathInfo p = new SlingRequestPathInfo(new MockResource(
                "/some/path", ".s1.s2.ext"));
        assertEquals("s1.s2", p.getSelectorString());
        assertEquals("ext", p.getExtension());

        // test to replace selectors with a new one
        RequestDispatcherOptions o = new RequestDispatcherOptions();
        o.setReplaceSelectors("a");
        RequestPathInfo result = p.merge(o);
        assertEquals("a", result.getSelectorString());
        assertEquals("ext", result.getExtension());

        // test to replace selector with the empty string
        o.setReplaceSelectors("");
        result = p.merge(o);
        assertEquals(null, result.getSelectorString());
        assertEquals("ext", result.getExtension());

        // now add a selector
        o.setAddSelectors("b");
        result = p.merge(o);
        assertEquals("b", result.getSelectorString());
        assertEquals("ext", result.getExtension());

        // replace ext
        o.setReplaceSuffix("html");
        result = p.merge(o);
        assertEquals("b", result.getSelectorString());
        assertEquals("html", result.getSuffix());
    }
 */