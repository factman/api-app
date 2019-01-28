// Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import should from "should";
import assert from "assert";
import app from "./../src/app";
import Review from "./../src/api/review/model";

chai.use(chaiHttp);
const URL = "http://localhost:4000/api/v1";

describe("Parent ", () => {
  describe("Review API Routes", () => {
  // This function will run before every test to clear database
    beforeEach((done) => {
    // Before each test we empty the database
      Review.remove({}, (err) => {
        if (err) return done(err);
        return done();
      });

      // Create a Review
      const review = new Review({
        customer_id: "1234",
        subject: "product",
        subject_id: "1234",
        comment: "review comment",
        rating: "5",
      });

      // Save Review in the database
      review.save()
        .then((data) => {
        // console.log(data);
        }).catch((err) => {
          console.log(`message: ${err.message} Some error occurred while creating the Review.`);
        });
    });


    describe("/POST Create Review ", () => {
      it("should create with valid attributes at POST /reviews", (done) => {
        const newReview = {
          customer_id: "1234",
          subject: "product",
          subject_id: "1234",
          comment: "review comment",
          rating: "5",
        };
        chai.request(URL)
          .post("/reviews").send(newReview)
          .end((err, res) => {
            // console.log(`\r\n1. POST Result ${typeof res}`);
            should(res.body.data.comment).be.eql(newReview.comment);
            if (err) return done(err);
            return done();
          });
      }).timeout(500);
    });


    describe("/GET a Review", () => {
      it("Expects a users review", (done) => {
        chai.request(URL)
          .get("/reviews/5b4ed0ba5cc5347b930b0580")
          .end((err, res) => {
            const response = JSON.parse(res.text);
            // console.log(`\r\n2. POST Result ${JSON.stringify(res)}`);
            assert((res.status === 404), "expect get review response status to be 404");
            assert((response.success === false), "The success is false");
            assert(Array.isArray(response.data), "the response data is array");
            if (err) return done(err);
            return done();
          });
      }).timeout(500);
    });

    // In this test it's expected a review list of two reviews
    describe("/GET all Reviews", () => {
      it("Should GET all the reviews", (done) => {
        chai.request(URL)
          .get("/reviews")
          .end((err, res) => {
            const response = JSON.parse(res.text);
            assert((res.status === 200), "the status is 200");
            assert((response.success === true), "The success is true");
            assert(Array.isArray(response.data), "the response data is array");
            assert((response.data.length), "at least there is 1 record");
            if (err) return done(err);
            return done();
          });
      }).timeout(500);
    });
  });
});
