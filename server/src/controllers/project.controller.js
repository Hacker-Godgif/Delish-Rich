import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import Project from "../models/Project.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/* -------------------------------------------------------------------------- */
/*                               CREATE PROJECT                               */
/* -------------------------------------------------------------------------- */

export const createProject = asyncHandler(
  async (req, res) => {
    const {
      slug,
      title,
      location,
      year,
      description,
    } = req.body;

    let coverImage = {
      url: "",
      public_id: "",
    };

    const images = [];

    if (req.files?.coverImage?.length) {
      const uploaded = await uploadToCloudinary(
        req.files.coverImage[0].path
      );

      coverImage = {
        url: uploaded.url,
        public_id: uploaded.public_id,
      };
    }

    if (req.files?.images?.length) {
      for (const file of req.files.images) {
        const uploaded =
          await uploadToCloudinary(file.path);

        images.push({
          url: uploaded.url,
          public_id: uploaded.public_id,
        });
      }
    }

    const project = await Project.create({
      slug,
      title,
      location,
      year,
      description,
      coverImage,
      images,
    });

    res.status(201).json(
      new ApiResponse(
        201,
        "Project created successfully",
        project
      )
    );
  }
);
/* -------------------------------------------------------------------------- */
/*                               GET PROJECTS                                 */
/* -------------------------------------------------------------------------- */

export const getProjects = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const filter = {};

  if (req.query.year) {
    filter.year = Number(req.query.year);
  }

  if (req.query.search) {
    filter.title = {
      $regex: req.query.search,
      $options: "i",
    };
  }

  const projects = await Project.find(filter)
    .sort({ year: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalProjects = await Project.countDocuments(
    filter
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Projects fetched successfully",
      {
        projects,
        page,
        limit,
        totalProjects,
        totalPages: Math.ceil(
          totalProjects / limit
        ),
      }
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                            GET PROJECT BY SLUG                             */
/* -------------------------------------------------------------------------- */

export const getProjectBySlug = asyncHandler(
  async (req, res) => {
    const project = await Project.findOne({
      slug: req.params.slug,
    });

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        "Project fetched successfully",
        project
      )
    );
  }
);

/* -------------------------------------------------------------------------- */
/*                             GET PROJECT BY ID                              */
/* -------------------------------------------------------------------------- */

export const getProjectById = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(
        400,
        "Invalid project id"
      );
    }

    const project = await Project.findById(id);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        "Project fetched successfully",
        project
      )
    );
  }
);

/* -------------------------------------------------------------------------- */
/*                               UPDATE PROJECT                               */
/* -------------------------------------------------------------------------- */

export const updateProject = asyncHandler(
  async (req, res) => {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    // remove selected images

    if (req.body.removedImages) {
      const removedImages = JSON.parse(
        req.body.removedImages
      );

      for (const publicId of removedImages) {
        await cloudinary.uploader.destroy(publicId);
      }

      project.images = project.images.filter(
        (image) =>
          !removedImages.includes(image.public_id)
      );
    }

    // replace cover image

    if (req.files?.coverImage?.length) {
      if (project.coverImage?.public_id) {
        await cloudinary.uploader.destroy(
          project.coverImage.public_id
        );
      }

      const uploaded = await uploadToCloudinary(
        req.files.coverImage[0].path
      );

      project.coverImage = {
        url: uploaded.url,
        public_id: uploaded.public_id,
      };
    }

    // upload new images

    if (req.files?.images?.length) {
      for (const file of req.files.images) {
        const uploaded =
          await uploadToCloudinary(file.path);

        project.images.push({
          url: uploaded.url,
          public_id: uploaded.public_id,
        });
      }
    }

    // update fields

    project.slug = req.body.slug ?? project.slug;
    project.title = req.body.title ?? project.title;
    project.location =
      req.body.location ?? project.location;
    project.year = req.body.year ?? project.year;
    project.description =
      req.body.description ??
      project.description;

    await project.save();

    res.status(200).json(
      new ApiResponse(
        200,
        "Project updated successfully",
        project
      )
    );
  }
);

/* -------------------------------------------------------------------------- */
/*                               DELETE PROJECT                               */
/* -------------------------------------------------------------------------- */

export const deleteProject = asyncHandler(
  async (req, res) => {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    if (project.coverImage?.public_id) {
      await cloudinary.uploader.destroy(
        project.coverImage.public_id
      );
    }

    for (const image of project.images) {
      await cloudinary.uploader.destroy(
        image.public_id
      );
    }

    await project.deleteOne();

    res.status(200).json(
      new ApiResponse(
        200,
        "Project deleted successfully"
      )
    );
  }
);