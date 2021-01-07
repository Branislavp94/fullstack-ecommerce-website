import React from 'react';

import Jumbotron from '../components/cards/Jumbotron';
import Categories from '../components/HomePage/Categories';
import NajProdavanijiProizvodi from '../components/HomePage/NajProdavanijiProizvodi';
import SubCategories from '../components/HomePage/SubCategories';
import NoviProizvodi from './../components/HomePage/NoviProizvodi';

function Home() {
	return (
		<div>
			<div className="jumbotron  h1 text-center font-weight-bold " style={{ color: '#03A9F4' }}>
				<Jumbotron text={[ 'Poslednji Proizvodi', 'Novi Proizvodi', 'Najprodavaniji Proizvodi' ]} />
			</div>
			<h4
				className="jumbotron   text-center  display-4 p-3 mb-5 mt-5 font-weight-bold"
				style={{ color: '#03A9F4' }}
			>
				Novi Proizvodi
			</h4>
			<NoviProizvodi className="text-center" />
			<br />
			<br />
			<h4
				className="jumbotron   text-center  display-4 p-3 mb-5 mt-5 font-weight-bold"
				style={{ color: '#03A9F4' }}
			>
				Najprodavaniji Proizvodi
			</h4>
			<NajProdavanijiProizvodi />
			<br />
			<br />
			<h4 className="jumbotron   text-center  display-4 p-3 mb-5 mt-5 font-weight-bold">Kategorije</h4>
			<Categories />
			<br />
			<br />
			<h4 className="jumbotron   text-center  display-4 p-3 mb-5 mt-5 font-weight-bold"> Sub Kategorije</h4>
			<SubCategories />
			<br />
			<br />
		</div>
	);
}

export default Home;
