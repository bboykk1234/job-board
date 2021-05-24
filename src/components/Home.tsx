import React from "react";

const Home: React.FC = () => (
    <div className="cover-container d-flex h-100 p-3 mx-auto flex-column align-items-center" style={{width: "800px"}}>
        <main className="px-3 my-auto">
            <h1>Lorem ipsum</h1>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi neque autem, dolorem dolores est officiis labore quibusdam nesciunt itaque beatae alias nam temporibus atque impedit ad perspiciatis minus voluptatibus illum!</p>
        </main>

        <footer className="mt-auto text-dark-50">
            <p>Cover template for <a href="https://getbootstrap.com/" className="text-dark">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-dark">@mdo</a>.</p>
        </footer>
    </div>
);

export default Home;