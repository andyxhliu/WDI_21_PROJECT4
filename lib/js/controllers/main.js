angular
  .module('OneApp')
  .controller("MainController", MainController);

MainController.$inject = ["$window", "$auth", "$rootScope", "$state", "TokenService", "SOUNDCLOUD_KEY", "Room", "User"];
function MainController($window, $auth, $rootScope, $state, TokenService, SOUNDCLOUD_KEY, Room, User) {
  var socket = $window.io();
  var self = this;
  this.currentSound = null;
  this.allRooms = Room.query();
  this.currentUserRooms = null;
  this.offset = 50;
  this.genre = null;
  this.textShow = true;
  this.allUsers = User.query();
  this.toBeAddedToPlaylist = false;
  this.trackToBeImported = [];
  this.roomSelections = [];

  this.toggleSelection = function(room) {
    var idx = self.roomSelections.indexOf(room);

    if (idx > -1) {
      self.roomSelections.splice(idx, 1);
    }
    else {
      self.roomSelections.push(room);
    }
  }

  this.textMuted = function() {
    if (this.textShow === false ) {
      this.textShow = true;
    } else if (this.textShow === true) {
      this.textShow = false;
    }
  }

  this.addToPlaylist = function(track) {
    track.toBeAddedToPlaylist = true;
    self.trackToBeImported.push(track);
    self.toBeAddedToPlaylist = true;
  }

  this.importedToPlaylist = function() {
    self.trackToBeImported.forEach(function(track) {
      track.toBeAddedToPlaylist = false;
      track.importedToPlaylist = true;
      self.roomSelections.forEach(function(room) {
        room.playlist.push(track);
        room.$update();
      })
      self.roomSelections = [];
    })
    self.trackToBeImported = [];
    self.toBeAddedToPlaylist = false;
  }

  this.clearPlaylist = function() {
    self.trackToBeImported.forEach(function(track) {
      track.toBeAddedToPlaylist = false;
      track.importedToPlaylist = false;
    })
    self.trackToBeImported = [];
    self.toBeAddedToPlaylist = false;
  }

  this.getUserRooms = function() {
    self.currentUser = TokenService.decodeToken();
    console.log(this.allRooms);
    this.allRooms.forEach(function(room) {
      room.users.forEach(function(user) {
        console.log(user, self.currentUser._id);
        if (user === self.currentUser._id) {
          console.log("hello");
        }
      })
    });
  }

  this.tracks = [];
  
  this.currentUser = TokenService.decodeToken();
  this.connected = false;

  $rootScope.$on('connected', function() {
    self.connected = true;
  });

  $rootScope.$on('disconnected', function() {
    self.connected = false;
  });

  $rootScope.$on('unauthorized', function() {
    $state.go("login");
  });

  $rootScope.$on('playing', function(event, time) {
    console.log("audio is playing", time);
  });

  $rootScope.$on('paused', function(event, time) {
    console.log("audio is paused", time);
  });

  $rootScope.$on("loggedIn", function() {
    self.currentUser = TokenService.decodeToken();
    self.playSomeSound();
  });

  this.logout = function() {
    $auth.logout();
    this.currentUser = null;
    $state.go("login");
  }

  this.randomSelection = function() {
    self.offset = Math.floor(Math.random()*1000);
    console.log(self.offset);
    self.playSomeSound();
  }

  this.playSomeSound = function() {
    SC.initialize({
      client_id: "057f6e8bbc48cc7f8ef8520b83444560" 
    });
    SC.get('/tracks', {
      order: 'hotness',
      offset: self.offset,
      genres: self.genre,
      limit: 20,
      bpm: {
        from: 100
      }
    }, function(tracks) {
      $rootScope.$applyAsync(function() {
        self.tracks = tracks.map(function(track) {
          track.stream_url += "?client_id=" + SOUNDCLOUD_KEY;
          return track;
        });
      });
    });
  }

  this.inputSound = function(url) {
    this.currentSound = url;
  }



}