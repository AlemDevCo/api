const express = require("express");
const axios = require("axios");

const app = express();

const itemIDs = ["0", "1", "2", "3"];

app.get("/", (req, res) => {
    const { userid, itemid } = req.query;
    let successful = false;

    const promises = itemIDs.map((id) => {
        const url = `https://inventory.roblox.com/v1/users/${userid}/items/${id}/${itemid}/is-owned`;
        return axios.get(url)
            .then((response) => {
                if (response.data === true) {
                    successful = true;
                }
            })
            .catch(() => {});
    });

    Promise.all(promises).then(() => {
        if (successful) {
            res.send("true");
        } else {
            res.send("false");
        }
    });
});

app.listen(3000);
