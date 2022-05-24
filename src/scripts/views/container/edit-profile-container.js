import '../../../styles/container/edit-profile-container.scss';
import getProfileByName from '../items/profile';

class editProfileContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section>
      <header class="title">
        <h1>Update Profile</h1>
      </header>
      <article>
        
        <form action="">
            <div class="data">
                <label for="email">Photo Profile</label>
                <div class="main-photos">
                    <div class="left">
                        ${getProfileByName('Ilyas')}
                    </div>
                    <div class="right">   
                        <input type="file" id="fileUpload"/>
                    </div>
                </div>
            </div>


            <div class="data">
                <label for="email">Email</label>
                <input type="text" placeholder="milyasarmans13@gmail.com" name="email" id="email">
            </div>

            <div class="data">
                <label for="fullname">Full Name</label>
                <input type="text" placeholder="M Ilyas Arman S" name="fullname" id="fullname">
            </div>

            <div class="data">
                <label for="address">Address</label>
                <input type="text" placeholder="Pringsewu, Lampung" name="address" id="address">
            </div>

            <div class="data">
                <label for="phone">Phone</label>
                <input type="text" placeholder="08385634345" name="phone" id="phone">
            </div>

            <div class="data">
                <label for="psw">New Password</label>
                <input type="password" placeholder="Enter New Password" name="psw" id="psw">
            </div>

            <div class="data">
                <label for="psw-repeat">Repeat New Password</label>
                <input type="password" placeholder="Reapet New Password" name="psw-repeat" id="psw-repeat">
            </div>
            <input type="submit" value="Update">
        </form>
      </article>
    </section>
    `;
  }
}

customElements.define('edit-profile-container', editProfileContainer);
