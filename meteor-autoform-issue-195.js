if (Meteor.isClient) {

    //Init selectedDocId
    Session.set("selectedDocId","")

    //Return all books in collection
    Template.books.books = function () {
        return Books.find({});
    }

    //Get the current selected book id and set the session var for the updateBookForm
    Template.books.events ({
        'click #edit' : function (event) {
            Session.set("selectedDocId",this._id)
        }
    })

    Template.updateBookForm.editingDoc = function () {
        return Books.findOne({_id: Session.get("selectedDocId")});
    };

    //Just to close the modal dialog after successful update
    AutoForm.addHooks(null, {
    onSubmit: function () {
      console.log("onSubmit ALL FORMS!");
      $('#myModal').modal('hide');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // fixture to populate db at init startup
    if (Books.find().count() === 0) {
      Books.insert({
        title: 'Book1',
        author: 'auth1',
        copies: '1'
      });

      Books.insert({
        title: 'Book2',
        author: 'auth2',
        copies: '2'
      });

      Books.insert({
        title: 'Book3',
        author: 'auth3',
        copies: '3'
      });
    }
  });
}

//Add meteor collection and schema
//Title and auther must be unique
Books = new Meteor.Collection("books", {
    schema: {
        title: {
            type: String,
            label: "Title",
            max: 200,
            unique: true,
            index: true,
        },
        author: {
            type: String,
            label: "Author",
            unique: true,
        },
        copies: {
            type: Number,
            label: "Number of copies",
            min: 0
        }
    }
});

