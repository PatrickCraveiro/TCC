const fs = require('fs');
const path = require('path');
const JSDOM = require('jsdom').JSDOM;

const htmlPath = path.join(__dirname, '../html');

console.log('\x1b[33mIniciando geração de HTML...');

let groups = fs.readdirSync(htmlPath);
groups.forEach((group) => {
	let groupPathSrc = path.join(htmlPath, group);
	let groupPathDist = path.join(__dirname, '../dist', group, 'html/');

	fs.readdir(groupPathSrc, (err, files) => {
		if (err) return console.log(err);

		let index = files.indexOf('_shared.html');

		let sharedFile = null;
		if (index !== -1) {
			let sharedFileContent = fs.readFileSync(
				path.join(groupPathSrc, '_shared.html'),
				{
					encoding: 'utf-8',
				}
			);
			if (sharedFileContent)
				sharedFile = new JSDOM(sharedFileContent).window.document.body;
		}

		fs.mkdir(groupPathDist, { recursive: true }, (err) => {
			if (err) return console.log(err);

			files.forEach((fileName) => {
				if (['old', '_shared.html'].includes(fileName)) return;

				fs.readFile(
					path.join(groupPathSrc, fileName),
					{ encoding: 'utf-8' },
					(err, data) => {
						if (err) return console.log(err);

						let newDom = null;

						if (sharedFile) {
							newDom = new JSDOM(data).window.document.body;
							Array.from(newDom.children).forEach((div) => {
								let sharedDiv = sharedFile.querySelector(`#${div.id}`);
								if (sharedDiv)
									div.innerHTML = sharedDiv.innerHTML + div.innerHTML; // HTML comum antes do HTML individual
							});
						}

						fs.writeFile(
							path.join(groupPathDist, fileName),
							sharedFile ? newDom.innerHTML : data,
							(err) => {
								console.log(
									`${
										err ? '\x1b[31mErro ao gerar' : '\x1b[32mGerado'
									} arquivo ${fileName}\x1b[0m`
								);
							}
						);
					}
				);
			});
		});
	});
});
