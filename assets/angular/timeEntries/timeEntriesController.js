/**
 * Created by kaustubh on 11/5/16.
 */
app.controller('TimeEntriesController', ['$log', '$scope', '$location', 'data', 'TimeEntriesFactory', 'ClientFactory', '$filter', function($log, $scope, $location, data, TimeEntriesFactory, ClientFactory, $filter) {
  if (data && data.timeEntriesList != undefined) {
    data.timeEntriesList.success(function(data) {
      var header_date = '';
      var time_entries = {};
      angular.forEach(data, function(entry, key) {
        var entry_date = $filter('date')(entry.updatedAt, "yyyy-MM-dd");
        var entry_array = {};
        if (header_date !== entry_date) {
          time_entries[entry_date] = {'total': 0, 'data': {}};
          header_date = entry_date;
        }
        time_entries[entry_date]['total'] = Number(time_entries[entry_date]['total']) + Number(entry.time);
        time_entries[entry_date]['data'][entry.id] = entry;
      });
      $scope.timeEntries = time_entries;
    });
  }

  if (data && data.tagsList != undefined) {
    data.tagsList.success(function(data) {
      $scope.tags = data;
    });
  }

  if (data && data.projectsList != undefined) {
    data.projectsList.success(function(data) {
      $scope.projects = data;
    });
  }

  io.socket.on('time-entry-created', function(obj) {
    if (obj) {
      $scope.$broadcast('timeEntryCreated', obj);
    }
  });

  io.socket.on('time-entry-deleted', function(obj) {
    $scope.$broadcast('timeEntryDeleted', obj);
  });

  $scope.$on('timeEntryCreated', function(event, obj) {
    console.log(obj.time_entry);
    var entry_date = $filter('date')(obj.time_entry.updatedAt, "yyyy-MM-dd");
    if ($scope.timeEntries[entry_date] === undefined) {
      $scope.timeEntries[entry_date] = {'total': 0, 'data': {}};
    }
    $scope.timeEntries[entry_date]['total'] = Number($scope.timeEntries[entry_date]['total']) + Number(obj.time_entry.time);
    $scope.timeEntries[entry_date]['data'][obj.time_entry.id] = obj.time_entry;
    $scope.$apply();
  });

  $scope.$on('timeEntryDeleted', function(event, obj) {
    var entry_date = $filter('date')(obj.time_entry.updatedAt, "yyyy-MM-dd");
    if ($scope.timeEntries[entry_date] !== undefined && $scope.timeEntries[entry_date]['data'][obj.time_entry.id] !== undefined) {
      delete $scope.timeEntries[entry_date]['data'][obj.time_entry.id];
      $scope.timeEntries[entry_date]['total'] = Number($scope.timeEntries[entry_date]['total']) - Number(obj.time_entry.time);
      if (Object.keys($scope.timeEntries[entry_date]['data']).length <= 0)
        delete $scope.timeEntries[entry_date];
    }
    $scope.$apply();
  });

  angular.extend($scope, {
    newTimeEntry: {},
    timeEntries: [],
    tags: []
  });

  angular.extend($scope, {
    saveTimeEntry: function(newTimeEntryForm) {
      console.log($scope.newTimeEntry.tags);
      ClientFactory.getClient($scope.newTimeEntry.project).success(function(response) {
        $scope.newTimeEntry.client_name = response[0].client_name;
        TimeEntriesFactory.saveNewTimeEntry($scope.newTimeEntry).success(function(response) {
          $scope.newTimeEntry = {};
          $location.path("/time-entries");
        }).error(function(message, code, data) {
          console.log(message);
        });
      }).error(function(message, code, data) {
        console.log(message);
      });
    },
    deleteTimeEntry: function(timeEntryId) {
      if (confirm("do you want to delete this entry?")) {
        TimeEntriesFactory.deleteTimeEntry(timeEntryId).success(function(response) {
          $scope.success = 'Time Entry deleted';
        }).error(function(message, code, data) {
          console.log(message);
        });
      }
    }
  });
}
])
;
