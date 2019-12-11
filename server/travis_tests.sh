set -e
export CI=TRUE
export NODE_ENV="test"
export JWT_SECRET="TEST_SECRET" 
export MONGO_URI="mongodb://db:27017/testdb" 
echo
echo ---------------------
echo LINT SERVER
echo ---------------------
echo
npm run lint
echo
echo ------------------
echo  RUN SERVER TESTS
echo ------------------
echo
echo "Test coverage must be above threshold of ${COVERAGE_THRESHOLD}%"
echo "Coverage threshold can be set in the root package.json's test script"
npm run test -- --coverage --passWithNoTests