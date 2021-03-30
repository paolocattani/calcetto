// teardown.js
module.exports = async function () {
	globalThis.__APPLICATION__.close();
};
