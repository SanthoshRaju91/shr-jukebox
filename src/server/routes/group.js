import Group from "../models/group";

export async function createGroup({ name, owner, invities_limit, description }) {
  try {
    const newGroup = new Group({ name, owner, invities_limit, description });
    return await newGroup.save();
  } catch (err) {
    throw new Error(err);
  }
}

export async function getGroup(groupId) {
  try {
    const group = await Group.findById(groupId);
    return group;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteGroup(groupId) {
  try {
    const group = await Group.findByIdAndRemove(groupId);
    return group;
  } catch (err) {
    throw new Error(err);
  }
}
