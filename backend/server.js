/**
 * TODO : simplify writing/reading of json files => create methods
 */

// REST API using express library
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json())
app.use(cors());

const APP_PORT = 8000;

// Start the Express server and listen on the specified port
app.listen(APP_PORT, () => console.log(`Server has started on port: ${APP_PORT}`));

// Initial data set
const john = {
    name: 'john', 
    videos: [
        {title: 'EasyVista IT Service Management for the Mobile User (Française)', 
            id:'WROlGNthbNE'},
        {title: 'AngularJS Fundamentals In 60ish Minutes',
            id:'i9MHigUZKEM'}, 
        {title: 'EasyVista IT Heroes - Episode 1',
            'id':'CkZKknKjEwo'}
    ]
};

const mark = {
    name: 'mark', 
    videos: [
        {title:'Learn React - React Crash Course 2018 - React Tutorial with Examples | Mosh',
            id:'Ke90Tje7VS0'}, 
        {title: 'Introduction to Angular JS',
            id:'8ILQOFAgaXE'}
    ]
};

/**
 * Function for initializing data in a JSON file
 * @param {Object} data The data JSON object to write
 * @param {string} file The file path where data will be written
 */
const initializeData = (data, file) => {
    // Convert data object to JSON format
    const jsonData = JSON.stringify(data, null, 2);
     
    // Write JSON data to specified file
    fs.writeFile(file, jsonData, (error) => {
        if (error) {
            console.error(`Error writting file: ${file}`);
        } else {
            console.log('Data written successfully');
        }
    });
}

/**
 * Get data from a specified user
 */
app.get('/:user', (req, res) => {
    const {user} = req.params;
    if (user === 'john' || user === 'mark') {
        const filePath = `./${user}.json`; 
        // Check if the JSON file exists for this user
        if (!fs.existsSync(filePath)) {
            // If the file doesn't exist, initialize the data with the corresponding user data (from the initial dataset)
            initializeData(user === 'john' ? john : mark, filePath);
        } else {
             // If the file exists, read the data from the JSON file and returns it
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            res.json(data);
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
})

/**
 * Add a video for a specific user
 */
app.post('/:user', (req, res) => {
    const { name, video } = req.body;
    
    if (!name || !video) {
      return res.status(400).send('Error adding the video');
    }
    const filePath = `./${name}.json`;

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file: ${filePath}`);
                return;
            }
            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);
        
                // Add new video to existing data
                jsonData.videos.push(video);
        
                // Write updated data to JSON file
                fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
                    if (err) {
                        console.error(`Error writting file: ${filePath}`);
                        return;
                    }
                    console.log('Data added successfully');
                    res.json(jsonData);
                });
            } catch (error) {
                console.error('Error parsing JSON data');
            }
        });
    }
  });

  /**
   * Delete a video for a specific user
   */
  app.delete('/:user', (req, res) => {
    const { name, video } = req.body;
    
    if (!name || !video) {
      return res.status(400).send('Error deleting the video');
    }
    const filePath = `./${name}.json`;

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file: ${filePath}`);
                return;
            }
            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);
        
                // Update the data
                jsonData.videos = jsonData.videos.filter((el) => el.id.toString() != video.id.toString());
        
                // Write the updated data back to the file
                fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
                    if (err) {
                        console.error(`Error writting file: ${filePath}`);
                        return;
                    }
                    console.log('Data deleted successfully');
                    res.json(jsonData);
                });
            } catch (error) {
                console.error('Error parsing JSON data');
            }
        });
    }
  });