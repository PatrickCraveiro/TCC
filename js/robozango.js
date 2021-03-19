function hexToRgb() {
  return colors.map(
    color =>
      `rgb(${parseInt(color.slice(0, 2), 16)}, ${parseInt(
        color.slice(2, 4),
        16
      )}, ${parseInt(color.slice(4), 16)})`
  );
}

function verificaPalavraDicaTexto() {
  document.querySelectorAll(".palavra-dica-texto").forEach(dicaTexto => {
    transportaPalavraDicaTexto(
      dicaTexto.attributes["data-tooltip-index"].value,
      dicaTexto
    );
  });

  if (document.querySelectorAll(".tooltip-content-area").length > 0) {
    document.querySelectorAll(".tooltip-content-area")[0].remove();
  }
}

function transportaPalavraDicaTexto(valueDicaTexto, dicaTexto) {
  document.querySelectorAll(".palavra-dica").forEach(dica => {
    if (valueDicaTexto == dica.attributes["data-global-index"].value)
      dica.append(dicaTexto);
  });
}

verificaPalavraDicaTexto();

let divs = [
  ".videomiolo div, .cached-area, .fake-clipboard, .fake-trash-bin, .modal, .apostila-element-diffs, video"
];

document.querySelectorAll(divs).forEach(div => {
  if (div) div.remove();
});

let attributes = [
  "data-global-index",
  "is",
  "data-not-selectable",
  "data-select-parent",
  "data-codigo-video",
  "data-codigo-imagem",
  "contenteditable",
  "draggable",
  "data-selection-hierarchy"
];
let classes = [
  "mostraRespostaQuestoes",
  "box-imagem-oculta",
  "marcado",
  "evidente"
];

document.querySelectorAll("comp").forEach(comp => {
  attributes.forEach(attribute => comp.removeAttribute(attribute));
  classes.forEach(className => comp.classList.remove(className));

  if (comp.getAttribute("style") === "") comp.removeAttribute("style");
});

const mapaCoresTexto = {
  CIR: {
    "rgb(139, 195, 74)": "destaque-primario",
    "rgb(51, 105, 30)": "destaque-secundario",
    "rgb(52, 87, 24)": "destaque-secundario",
    "rgb(104, 159, 56)": "destaque-terciario"
  },
  CLM: {
    "rgb(255, 152, 0)": "destaque-primario",
    "rgb(230, 81, 0)": "destaque-secundario",
    "rgb(245, 124, 0)": "destaque-terciario"
  },
  GO: {
    "rgb(79, 195, 247)": "destaque-primario",
    "rgb(121, 183, 228)": "destaque-primario",
    "rgb(1, 87, 155)": "destaque-secundario",
    "rgb(0, 74, 136)": "destaque-secundario",
    "rgb(0, 145, 234)": "destaque-terciario",
    "rgb(0, 149, 218)": "destaque-terciario"
  },
  PED: {
    "rgb(240, 98, 146)": "destaque-primario",
    "rgb(136, 14, 79)": "destaque-secundario",
    "rgb(197, 17, 98)": "destaque-terciario"
  }
};

let estilosTexto = {
  styles: {
    "font-weight: bold;": "negrito",
    "font-style: italic;": "italico",
    "text-decoration-line: underline;": "sublinhado",
    "vertical-align: super;": "sup",
    "vertical-align: sub;": "sub"
  },
  tags: {
    b: "negrito",
    i: "italico",
    u: "sublinhado",
    sup: "sup",
    sub: "sub"
  }
};

let classeApostila = document
  .querySelector(".apostila")
  .classList[1].split("-")[1]
  .toUpperCase();
let coresApostila = mapaCoresTexto[classeApostila];
Object.getOwnPropertyNames(coresApostila).forEach(cor => {
  estilosTexto.styles[`color: ${cor};`] = coresApostila[cor];
});

let styles = estilosTexto.styles;
let tags = estilosTexto.tags;

Object.getOwnPropertyNames(styles).forEach(style => {
  let compClass = styles[style];
  document.querySelectorAll(`[style*="${style}"]`).forEach(elem => {
    // convert to camelCase
    let styleName = style
      .slice(0, style.indexOf(":"))
      .replace(/-./g, match => match.replace("-", "").toUpperCase());

    elem.style[styleName] = null;
    elem.classList.add(compClass);

    if (
      !Object.getOwnPropertyNames(tags).includes(elem.tagName.toLowerCase()) &&
      elem.getAttribute("style") === ""
    ) {
      elem.removeAttribute("style");
      let newComp = document.createElement("comp");
      newComp.className = elem.className;
      newComp.innerHTML = elem.innerHTML;
      elem.replaceWith(newComp);
    }
  });
});

Object.getOwnPropertyNames(tags).forEach(tag => {
  let compClass = tags[tag];

  document.querySelectorAll(tag).forEach(elem => {
    let newClass =
      elem.className === "" ? compClass : `${elem.className} ${compClass}`;
    elem.outerHTML = `<comp class="${newClass}">${elem.innerHTML}</comp>`;
  });
});

let getCaps = document.querySelectorAll(".cap");

for (x = 0; x < getCaps.length - 1; x++) {
  if (getCaps[x].lastElementChild.matches(".duvidas-academicas")) continue;

  let duvidasAcademicas = document.createElement("comp");
  duvidasAcademicas.className = "duvidas-academicas";
  let botaoDuvidasAcademicas = document.createElement("comp");
  botaoDuvidasAcademicas.className = "botao-duvidas-academicas";

  duvidasAcademicas.appendChild(botaoDuvidasAcademicas);
  getCaps[x].appendChild(duvidasAcademicas);
}

function removeParagrafoVazio() {
  document.querySelectorAll(".paragrafo").forEach(el => {
    if (el.innerHTML === "" && el.innerText === "") {
      el.remove();
    }
  });
}
removeParagrafoVazio();

const removeStyle = document.querySelectorAll(".duvidas-academicas");
removeStyle.forEach(elem => {
  if (elem.style.cssText) {
    elem.style.cssText = "";
  }
});

document.querySelectorAll("[data-image-ref]").forEach(el => {
  if (el.addEventListener) return;
  if (!el.lastElementChild.contains("img-stick-right")) {
    const imgStick = document.createElement("comp");
    imgStick.classList.add("img-stick-right");
    imgStick.innerHTML = "_";
    el.appendChild(imgStick);
  }
});

document.querySelectorAll(".questoes__header-curso").forEach(el => {
  el.remove();
});

const imagemServidor = "d1jsa4jz7pnf5n.cloudfront.net";
const imagem = document.querySelectorAll("img");
for (let i = 0; i < imagem.length; i++) {
  let img = imagem[i];
  img.src = img.src.replace(
    /apostilas-readerpro.s3.amazonaws.com/gi,
    imagemServidor
  );
}

//verificar se os 3 niveis de hierarquias estão fora do padrão antes de remover essas hierarquias abaixo
document
  .querySelectorAll(
    ".index-title-move-box, .index-title-close, video, .caixa-iframe, .videomiolo__votes, .placeholder-image, .btn-select-video"
  )
  .forEach(index => {
    index.remove();
  });

//, .indice-estendido__h4, .indice-estendido__h5, .indice-estendido__h6, .indice-estendido__h7, .indice-estendido__h8

// const titulos = document.querySelectorAll('.titulo--h4[indice-alvo-ref], .titulo--h5[indice-alvo-ref], .titulo--h6[indice-alvo-ref], .titulo--h7[indice-alvo-ref], .titulo--h8[indice-alvo-ref]');

// titulos.forEach(el => {
//   if (el.hasAttribute('indice-alvo-ref')) {
//     el.removeAttribute('indice-alvo-ref')
//   }
// })

// Função que remove questões de MASTO + TEGO de acordo com a apostila.
// const apostila = document.querySelector("body");

// if (
//   apostila.classList.contains("r3-go") &&
//   !apostila.classList.contains("masto") &&
//   !apostila.classList.contains("tego")
// ) {
//   document.querySelectorAll(".questoes").forEach(questao => {
//     if (!questao.classList.contains("is-r4-go")) {
//       questao.remove();
//     }
//   });
// } else if (
//   apostila.classList.contains("r3-go") &&
//   apostila.classList.contains("masto") &&
//   !apostila.classList.contains("tego")
// ) {
//   document.querySelectorAll(".questoes").forEach(questao => {
//     if (!questao.classList.contains("is-masto")) {
//       questao.remove();
//     }
//   });
// } else if (
//   apostila.classList.contains("r3-go") &&
//   !apostila.classList.contains("masto") &&
//   apostila.classList.contains("tego")
// ) {
//   document.querySelectorAll(".questoes").forEach(questao => {
//     if (!questao.classList.contains("is-tego")) {
//       questao.remove();
//     }
//   });
// }

document.querySelectorAll(".botao-questoes").forEach(btn => {
  if ((btn.innerHTML = "MOSTRAR RESPOSTA")) return;
});

document.querySelectorAll("input").forEach(input => input.remove());

//verifica videomiolo vazio e exclui o elemento
// document.querySelectorAll('.video-miolo').forEach(el => {
//   if(!el.getAttribute('href')) {
//     el.remove();
//   }
// })

// function trocaDivPorComp() {
//   var todasDivs = document.querySelectorAll('div');
//   todasDivs.forEach(umaDiv => {
//     var novoComp = document.createElement('comp');
//     novoComp.innerHTML = umaDiv.innerHTML;
//     umaDiv.parentNode.replaceChild(novoComp, umaDiv);
//   });
// }

// Automatizar indice com 3 hierarquias
document
  .querySelectorAll(
    ".index-title-children .index-title-children .index-title-children"
  )
  .forEach(div => {
    div.remove();
  });

// Retira posições 'vazias' dos titulos
let indice = document.querySelectorAll('[indice-ref]');
let alvo = document.querySelectorAll('[indice-alvo-ref]');
let indices = []
let alvos = []
let diferenca = []
indice.forEach(el => {
  indices.push(el.getAttribute('indice-ref'))
})
alvo.forEach(el => {
  alvos.push(el.getAttribute('indice-alvo-ref'))
})
alvos.forEach((el, index, array) => {
  if (indices.indexOf(el) === -1) diferenca.push(el)
})

for (let value of diferenca) {
  document.querySelectorAll(`[indice-alvo-ref="${value}"]`).forEach(el => {
    el.removeAttribute('indice-alvo-ref')
  })
}

// Adiciona área de treinamento no índice

let lastRefs = document.querySelectorAll('[indice-ref]');
let number = parseInt(lastRefs[lastRefs.length - 1].getAttribute('indice-ref').match(/\d+/g)[0]);
let lastCapIndice = document.querySelectorAll('.indice-estendido .indice-estendido__h1');
let lastCapApo = document.querySelectorAll('.cap');

let treinamentoIndice = document.createElement('comp');
treinamentoIndice.className = 'indice-estendido__h1';
treinamentoIndice.innerHTML = `
        <comp class="index-title-content">
        <comp class="titulo--h1" indice-ref="pos-${number + 1}">ÁREA DE TREINAMENTO</comp>
        </comp>
        <comp class="index-title-children">
        <comp class="indice-estendido__h2">
            <comp class="index-title-content">
                <comp class="titulo--h2" indice-ref="pos-${number + 2}">QUESTÕES DA APOSTILA</comp>
            </comp>
        </comp>
        </comp>
`;
lastCapIndice = lastCapIndice[lastCapIndice.length - 1];
lastCapIndice.insertAdjacentElement('afterend', treinamentoIndice);

// Adiciona área de treinamento no corpo da apostila

let treinamentoApo = document.createElement('comp');
treinamentoApo.className = 'cap';
treinamentoApo.innerHTML = `
        <comp class="espacador">
          <comp class="subcap" indice-alvo-ref="pos-${number + 1}"></comp>
        </comp>


        <comp class="espacador">
          <comp class="subcap" indice-alvo-ref="pos-${number + 2}"></comp>
        </comp>

        <comp class="questao-apostila">
          <comp class="botao-questao-apostila"></comp>
        </comp>
`;
lastCapApo = lastCapApo[lastCapApo.length - 1];
lastCapApo.insertAdjacentElement('afterend', treinamentoApo);