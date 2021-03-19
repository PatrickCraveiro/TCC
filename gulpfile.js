'use strict';

// [Gui] Gulp 4.0

const imagemUrlLocal = '../../imagens-componentes/';
const imagemUrlProd =
	'http://d1jsa4jz7pnf5n.cloudfront.net/imagens-componentes/';

const fontUrlLocal = '../../fonts-componentes/';
const fontUrlProd = 'http://d1jsa4jz7pnf5n.cloudfront.net/fonts-componentes/';

const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const minifyCss = require('gulp-clean-css');
const replace = require('gulp-replace');
const sass = require('gulp-sass');

// [Gui] Biblioteca Falcon - 2020

const editoras = {
	//-- R+ --//
	r3_mederi: {
		'r3-cir': ['78_22', '96_22'],
		'r3-go': ['80_26', '80_33', '95_26', '96_26'],
		'r3-ped': ['79_37'],
	},
	r3_medwriters: {
		'r3-clm': ['77_54'],
	},
	rac: {
		rac: ['91_91'],
	},
	racipe: {
		racipe: ['92_92'],
	},

	//-- INTENSIVAO --//
	int_mederi: {
		'int-clm': [
			'decoreba_14_54',
			'decoreba_14_27',
			'decoreba_14_29',
			'decoreba_14_31',
			'decoreba_14_40',
		],
		'int-cir': ['decoreba_14_22'],
		'int-go': ['decoreba_14_33'],
		'int-ped': ['decoreba_14_37'],
		'int-pre': ['decoreba_14_30'],
	},
	//-- MEDIMAGEM --//
	medimagem: {
		'mi-clm': ['102_54'],
		'mi-cir': ['102_22'],
		'mi-go': ['102_26', '102_33'],
		'mi-ped': ['102_37'],
		'mi-pre': ['102_30'],
	},
	//-- MED MEDERI --//
	med_mederi: {
		'med-cir': ['17_22'],
		'med-gin': ['17_26'],
		'med-obs': ['17_33'],
		'med-ped': ['17_37'],
		'med-pre': ['17_30'],
	},
	//-- MEDCURSO --//
	mdc_medyklin: {
		'mdc-car': [
			'16_21'
		],
		'mdc-der': [
			'16_23',
			'47_23'
		],
		'mdc-end': [
			'16_24'
		],
		'mdc-gas': [
			'16_25'
		],
		'mdc-hem': [
			'16_27'
		],
		'mdc-hep': [
			'16_28'
		],
		'mdc-inf': [
			'16_29'
		],
		'mdc-nef': [
			'16_31'
		],
		'mdc-neu': [
			'16_32'
		],
		'mdc-oft': [
			'16_34',
			'47_34'
		],
		'mdc-pne': [
			'16_38'
		],
		'mdc-psi': [
			'16_39',
			'47_39'
		],
		'mdc-reu': [
			'16_40'
		],
	},
	// MDC MEDYN
	mdc_medyn: {
		'mdc-cir': ['16_22', '47_22'], //recado para 2021: mdc cir 04 é uma especialíssima (ÚNICO)
		'mdc-gin': ['16_26'],
		'mdc-obs': ['16_33'],
		'mdc-ped': ['16_37'],
		'mdc-pre': ['16_30'],
		'mdc-ort': ['16_35', '47_35'],
	},
	// MED MEDWRITERS
	med_medwriters: {
		'med-clm': ["17_54", "17_60"]
	},
	medeletro: {
		'medeletro': ['56_21']
	},
	cpmed_extensivo: {
		'cp-med': ['100_100']
	}
};

// Aqui se inicia o processo de geração de CSS para cada editora.
Object.getOwnPropertyNames(editoras).forEach(editora => {
	let temasEditora = editoras[editora];
	let pastaEditora = editora.toUpperCase();
	let distEditora = `dist/${editora}/css`;

	// Função para contar os temas da editora
	function contaTemas() {
		let temas = [];

		Object.getOwnPropertyNames(temasEditora).forEach(tema => {
			let tasks = [];
			let qtdCodigos = temasEditora[tema].length;
			for (let i = 1; i <= qtdCodigos; i++)
				tasks.push(`generate-${tema}-${i}`);

			temas.push(gulp.series(`sass-${tema}`, gulp.parallel(tasks)));
		});

		return temas;
	}

	// Executa a geração de CSS para cada tema na editora.
	Object.getOwnPropertyNames(temasEditora).forEach(tema => {
		let codigos = temasEditora[tema];

		// Concatenação de arquivos Sass e geração de CSS
		gulp.task(
			`sass-${tema}`,
			() => {
				return gulp
					.src([
						// primeiro entram os componentes gerais
						'scss/GERAL/funcoes/*.scss',
						'scss/GERAL/**/*.scss',
						// depois entram o nome e as cores do tema
						`scss/${pastaEditora}/${tema}/${tema}.scss`,
						// agora entram todos os componentes, aplicando os dados do arquivo acima
						`scss/${pastaEditora}/componentes/**/*.scss`,
					])
					.pipe(concat(`${tema}.css`))
					.pipe(sass())

					// substitui URLs
					.pipe(replace(imagemUrlLocal, imagemUrlProd))
					.pipe(replace(fontUrlLocal, fontUrlProd))

					// minifica o CSS
					.pipe(minifyCss())

					.pipe(gulp.dest(`_temp-${editora}`));
			}
		);

		// Geração dos arquivos finais a partir do CSS obtido acima
		codigos.forEach((codigo, index) => {
			gulp.task(
				`generate-${tema}-${index + 1}`,
				() => {
					return gulp.src(`_temp-${editora}/${tema}.css`)

						// gera o arquivo - HOMOL
						.pipe(concat(`homol_2021_${codigo}.min.css`))
						.pipe(gulp.dest(distEditora))

						// gera o arquivo - PROD
						.pipe(concat(`2021_${codigo}.min.css`))
						.pipe(gulp.dest(distEditora))

						.pipe(replace(".nb-bonus-apostila,.nb-drogas-apostila,.nb-duvidas-academicas,.nb-questoes-apostila,.nb-tabela-exames{display:flex",
							".nb-bonus-apostila,.nb-drogas-apostila,.nb-duvidas-academicas,.nb-questoes-apostila,.nb-tabela-exames{display:none"))
						.pipe(concat("2021_" + codigo + ".min.css"))
						.pipe(gulp.dest(distEditora));

				}
			);
		});
	});

	// Gera os temas e depois limpa a pasta temporária
	gulp.task(
		`editora-${editora}`,
		gulp.series(gulp.parallel(...contaTemas()), () => {
			return gulp
				.src(`_temp-${editora}`, {
					read: false,
				})
				.pipe(clean());
		})
	);

	// Tarefa inicial
	gulp.task(editora, gulp.series(`editora-${editora}`));
});

// Conta as editoras em um único array para a tarefa principal
function contaEditoras() {
	return Object.getOwnPropertyNames(editoras);
}

// Limpa a pasta principal antes de iniciar as etapas individuais
gulp.task(
	'clean-all',
	() => {
		return gulp
			.src('dist', {
				read: false,
				allowEmpty: true,
			})
			.pipe(clean());
	}
);

// Tarefa principal, que gera o CSS da biblioteca e de todas as editoras
gulp.task('build', gulp.series('clean-all', gulp.parallel(...contaEditoras())));
