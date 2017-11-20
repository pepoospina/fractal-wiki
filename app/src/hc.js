// Copyright (C) 2013-2017, The MetaCurrency Project (Eric Harris-Braun & Arthur Brock)
// Use of this source code is governed by GPLv3 found in the LICENSE file
//---------------------------------------------------------------------------------------

// Holochain UI library

// use send to make an ajax call to your exposed functions
import axios from 'axios'

const send = function (fn,data,resultFn) {
    console.log("calling: " + fn+" with "+JSON.stringify(data));
    axios.post(
        "/fn/Card/"+fn,
        JSON.stringify(data)
    ).then((response) => {
        console.log("response: " + response.data);
        resultFn(response.data);
    }).catch(function(response) {
        console.log("response failed: " + response.responseText);
    })
    ;
};

const isErr = function (result) {
  return ((typeof result === "object") && (result.name === "HolochainError"));
}

export {
  send,
  isErr
}
