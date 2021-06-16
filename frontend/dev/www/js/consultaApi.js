var mensagemErro = "Digite um ID válido";

function a8() {
  let infoClinica = document.querySelector("[clinicaescolhida]");
  infoUsuario = document.querySelector("#infoLoginUser");
  infoUsuario.append(infoClinica.children[3]);
  infoUsuario.append(infoClinica.children[1]);

  let modalConsulta = document.querySelector(".swirl-in-fwd");
  modalConsulta.innerHTML = `
  <div class="multi-select-calendar">
	<div class="calendarioConsulta calendarioConsulta-light calendarioConsulta-default">
		<div class="calendarioConsulta-top"> <a href="#" class="calendarioConsulta-top-nav calendarioConsulta-top-prev">
				<span class="icon-arrow-left calendarioConsulta-top-icon"></span> </a>
			<div class="calendarioConsulta-top-date"> <span class="calendarioConsulta-top-month">Jun</span> <span
					class="calendarioConsulta-top-year">2021</span> </div> <a href="#"
				class="calendarioConsulta-top-nav calendarioConsulta-top-next"> <span
					class="icon-arrow-right calendarioConsulta-top-icon"></span> </a>
		</div>
		<div class="calendarioConsulta-header">
			<div class="calendarioConsulta-week calendarioConsulta-semana-dom">DOM</div>
			<div class="calendarioConsulta-week calendarioConsulta-semana-seg">SEG</div>
			<div class="calendarioConsulta-week calendarioConsulta-semana-ter">TER</div>
			<div class="calendarioConsulta-week calendarioConsulta-semana-qua">QUA</div>
			<div class="calendarioConsulta-week calendarioConsulta-semana-qui">QUI</div>
			<div class="calendarioConsulta-week calendarioConsulta-semana-sex">SEX</div>
			<div class="calendarioConsulta-week calendarioConsulta-semana-sab">SAB</div>
		</div>
		<div class="calendarioConsulta-body">
			<div class="calendarioConsulta-row">
				<div class="calendarioConsulta-unit calendarioConsulta-semana-dom"></div>
				<div class="calendarioConsulta-unit calendarioConsulta-semana-seg"></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-ter"
					data-date="2021-06-01"><a href="#">1</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-quar"
					data-date="2021-06-02"><a href="#">2</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-qui"
					data-date="2021-06-03"><a href="#">3</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-sex"
					data-date="2021-06-04"><a href="#">4</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-sab"
					data-date="2021-06-05"><a href="#">5</a></div>
			</div>
			<div class="calendarioConsulta-row">
				<div class="calendarioConsulta-unit calendarioConsulta-unit-date calendarioConsulta-semana-dom"
					data-date="2021-06-06"><a href="#">6</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-seg"
					data-date="2021-06-07"><a href="#">7</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-ter"
					data-date="2021-06-08"><a href="#">8</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-quar"
					data-date="2021-06-09"><a href="#">9</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-qui"
					data-date="2021-06-10"><a href="#">10</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-sex"
					data-date="2021-06-11"><a href="#">11</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-sab"
					data-date="2021-06-12"><a href="#">12</a></div>
			</div>
			<div class="calendarioConsulta-row">
				<div class="calendarioConsulta-unit calendarioConsulta-unit-date calendarioConsulta-semana-dom"
					data-date="2021-06-13"><a href="#">13</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-seg"
					data-date="2021-06-14"><a href="#">14</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-ter"
					data-date="2021-06-15"><a href="#">15</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-quar"
					data-date="2021-06-16"><a href="#">16</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-qui"
					data-date="2021-06-17"><a href="#">17</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-sex"
					data-date="2021-06-18"><a href="#">18</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-sab"
					data-date="2021-06-19"><a href="#">19</a></div>
			</div>
			<div class="calendarioConsulta-row">
				<div class="calendarioConsulta-unit calendarioConsulta-unit-date calendarioConsulta-semana-dom"
					data-date="2021-06-20"><a href="#">20</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-seg"
					data-date="2021-06-21"><a href="#">21</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-ter"
					data-date="2021-06-22"><a href="#">22</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-quar"
					data-date="2021-06-23"><a href="#">23</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-qui calendarioConsulta-unit-active calendarioConsulta-unit-first-active"
					data-date="2021-06-24"><a href="#">24</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-sex"
					data-date="2021-06-25"><a href="#">25</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-sab"
					data-date="2021-06-26"><a href="#">26</a></div>
			</div>
			<div class="calendarioConsulta-row">
				<div class="calendarioConsulta-unit calendarioConsulta-unit-date calendarioConsulta-semana-dom"
					data-date="2021-06-27"><a href="#">27</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-seg"
					data-date="2021-06-28"><a href="#">28</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-ter"
					data-date="2021-06-29"><a href="#">29</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-unit-date calendarioConsulta-semana-quar"
					data-date="2021-06-30"><a href="#">30</a></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-semana-qui"></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-semana-sex"></div>
				<div class="calendarioConsulta-unit  calendarioConsulta-semana-sab"></div>
			</div>
		</div>
	</div>
</div>
  `;

  marcaDataConsulta();
}
