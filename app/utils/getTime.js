const getTime = (time) => {
    const updatedTime = new Date(time);
    return updatedTime.getTime();
  };

export default getTime;