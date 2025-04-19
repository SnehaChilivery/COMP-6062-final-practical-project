//creating Vue application
const app = Vue.createApp({
    //Stores all data used in app
    data() {
      return {
        //information about random user (name,age,profile)
        user: {
          name: '',
          age: '',
          photo: ''
        },
        //user input for weather (city, province and country)
        weatherInput: {
            city: 'London',
            province: 'Ontario',
            country: 'Canada'
          },
          //store weather info after fetching it from API
          weather: {
            temperature: '',
            wind: '',
            description: ''
        },
        //user input word
        dictionaryInput:  '',
        //stores results of dictionary
        dictionary: {
            word: '',
            phonetic: '',
            definition: ''
        }
      };
    },
    //runs automatically when page loads
    mounted() {
        this.getUserProfile();   
        this.getWeather();
    },
    //functions used in app
    methods: {
        // Fetches random user's name, age, and photo from the API
        getUserProfile() {
            fetch('https://comp6062.liamstewart.ca/random-user-profile')
                .then(response => response.json())//convert to JSON
                .then(data => {
                    this.user.name = data.first_name + ' ' + data.last_name;
                    this.user.age = data.age;
                    this.user.photo = data.profile_picture;
                });
        },
        //Fetches weather details based on user input or gives default values
        getWeather() {
           
            fetch(`https://comp6062.liamstewart.ca/weather-information?city=${this.weatherInput.city}&province=${this.weatherInput.province}&country=${this.weatherInput.country}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind_speed;
                    this.weather.description = data.weather_description;
                });
            
        },
        // Searches the word in the dictionary and shows its meaning and pronunciation
        getDefinition() {
          
            fetch(`https://comp6062.liamstewart.ca/define?word=${this.dictionaryInput}`)

            .then(response => response.json())
            .then(data => {
                const result = data[0]; //takes the first match in results
                this.dictionary.word = result.word;
                this.dictionary.phonetic = result.phonetic;
                this.dictionary.definition = result.definition;
            });
        }
          
    }
  });
  
  app.mount('#app');
  
  