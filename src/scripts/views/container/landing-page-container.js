import '../../../styles/container/landing-page-container.scss';

class landingContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="home"> 
            
        <!-- <div class="image">
            <img src="homeapp.png" alt="">
        </div> --!>

        <div class="content">
            <h3>Lorem Ipsum</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima labore similique eos harum atque omnis ex consectetur, assumenda sunt ad facilis illum quaerat doloremque. Aut eveniet culpa enim suscipit ullam!</p>
            <button><a href="/#/login">Mulai</a></button>
        </div>

    </section>    
    

    <section class="about">
    
        <h1 class="heading">Lorem ipsum</h1>
    
    <div class="row">
            
        <div class="image">
            <img src="app.png" alt="">
        </div>    
    
        <div class="content">
            <h3>Take a Look Around our App</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus labore perspiciatis iusto debitis, explicabo neque earum accusamus adipisci eius, nobis laboriosam, autem modi porro quisquam saepe assumenda fuga quod ipsa!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit rerum excepturi alias quas voluptatibus provident voluptatum sapiente quos enim praesentium?</p>
        </div>
    
    </div>
    
    </section>    
      
    <section class="usage">
    
        <h1 class="heading">Lorem ipsum</h1>
    
        <div class="row">
    
            <div class="box-container">
                <div class="box">
                    <i class="fa-solid fa-scale-balanced"></i>
                    <h3>minimum progress</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem dolor nihil dicta eveniet quam nam explicabo, natus labore quia cupiditate.</p>
                </div>
                <div class="box">
                    <i class="fa-solid fa-piggy-bank"></i>
                    <h3>active time</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem dolor nihil dicta eveniet quam nam explicabo, natus labore quia cupiditate.</p>
                </div>
            </div>
    
            <img src="beranda.png" alt="">
    
            <div class="box-container">
                <div class="box">
                    <i class="fa-solid fa-coins"></i>
                    <h3>maximum progress</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem dolor nihil dicta eveniet quam nam explicabo, natus labore quia cupiditate.</p>
                </div>
                <div class="box">
                    <i class="fa-solid fa-receipt"></i>
                    <h3>calories burned</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem dolor nihil dicta eveniet quam nam explicabo, natus labore quia cupiditate.</p>
                </div>
            </div>
    
        </div>
    
    </section>    
    
    
    <section class="features">
    
        <h1 class="heading">Lorem ipsum</h1>
    
        <div class="box-container">
    
            <div class="box">
                <i class="fa-solid fa-window-restore"></i>
                <h3>Lorem ipsum dolor</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim ad neque. Voluptatem alias beatae accusamus laudantium nisi assumenda libero.</p>
            </div>
            <div class="box">
                <i class="fa-solid fa-sack-dollar"></i>
                <h3>Lorem ipsum dolor</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim ad neque. Voluptatem alias beatae accusamus laudantium nisi assumenda libero.</p>
            </div>
            <div class="box">
                <i class="fas fa-globe"></i>
                <h3>Lorem ipsum dolor</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim ad neque. Voluptatem alias beatae accusamus laudantium nisi assumenda libero.</p>
            </div>
            <div class="box">
                <i class="fa-solid fa-chart-line"></i>
                <h3>Lorem ipsum dolor</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim ad neque. Voluptatem alias beatae accusamus laudantium nisi assumenda libero.</p>
            </div>
            <div class="box">
                <i class="fa-solid fa-money-bill-trend-up"></i>
                <h3>Lorem ipsum dolor</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim ad neque. Voluptatem alias beatae accusamus laudantium nisi assumenda libero.</p>
            </div>
            <div class="box">
                <i class="fa-solid fa-money-bill-transfer"></i>
                <h3>Lorem ipsum dolor</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim ad neque. Voluptatem alias beatae accusamus laudantium nisi assumenda libero.</p>
            </div>
    
        </div>
    
    </section>    
    `;
  }
}

customElements.define('landing-page-container', landingContainer);
