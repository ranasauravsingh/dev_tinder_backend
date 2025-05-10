const handleError = (req, res, err) => {
	res.status(400).send({
		message: `Something went wrong: ${err?.message}`,
	});
};

module.exports = {
    handleError,
}