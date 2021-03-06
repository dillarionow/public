# BioSignals
BioSignals is a [package](https://datagrok.ai/help/develop/develop#packages) for the [Datagrok](https://datagrok.ai) platfrom.
The goal of the project is to offer an efficient and automated biosignal processing routine. The initial version is based on [pyphysio](https://github.com/MPBA/pyphysio) - a python library
developed by [Andrea Bizzego](https://www.sciencedirect.com/science/article/pii/S2352711019301839).

The package reinforces the existing pyhton code with datagroks' [visualization](https://datagrok.ai/help/visualize/viewers) and [data processing](https://datagrok.ai/help/transform/add-new-column) tools. The pipeline itself is designed with scientific 
community in mind, standartizing and thus facilitating the usual ECG, EEG, EDA, etc. signal processing workflows. The fusion of manual and automated steps is largely enabled
by our [interactive viewers](https://datagrok.ai/help/visualize/viewers), [scripting](https://dev.datagrok.ai/help/develop/scripting) capabilities, 
[detector](https://datagrok.ai/help/develop/how-to/add-info-panel) functions,
[data augmentation](https://datagrok.ai/help/discover/data-augmentation),
and a curated collection of the [scientific methods](https://datagrok.ai/help/learn/data-science).   

In particular, project's initial goals are:
* automatically read various biosensor file formats
  * integrate with the built-in file share browser 
* provide efficient interactive visualizations for raw biosensor data
  * including domain-specific visualizations, such as "head view" for EEG
* provide efficient ways for manipulating raw biosensor data (marking regions, etc)
* provide a collection of high-performance DSP algorithms
* detect type of signals, along with the metadata (sampling rate, etc)
* automatically suggest analyses and pipelines applicable to the current dataset
  * Example: "Extract step count" for the accelerometry data 
* visually define pipelines
* derive high-level features out of the raw biosensor signal
* allow to build predictive models by integrating previously defined pipelines with the Datagrok's [predictive modeling](https://datagrok.ai/help/learn/predictive-modeling) capabilities
  * Example: training a model to find "bad" quality segments based on the manually annotated data
        
Currently, the project is in its early stages, and we welcome you to contribute to this repository. 

# Pyphysio
[Pyphysio](https://github.com/MPBA/pyphysio) is a library that contains the implementations of the most important algorithms for the analysis of physiological data.
The latter methods are divided into the following categories:

* **estimators**: from a signal produce a signal of a different type;
* **filters**: from a signal produce a filtered signal of the same type;
* **indicators**: from a signal produce a value;
* **segmentation**: from a signal produce a series of segments;
* **tools**: from a signal produce arbitrary data;

# A unique approach to every signal
Key signal types:

* [ECG](https://www.ahajournals.org/doi/full/10.1161/01.cir.93.5.1043): heartbeat data;
* [EDA](https://www.biopac.com/wp-content/uploads/EDA-SCR-Analysis.pdf): electro-dermal activity;
* [EEG](https://www.kiv.zcu.cz/site/documents/verejne/vyzkum/publikace/technicke-zpravy/2013/tr-2013-02.pdf): brain activity;

Since various signals require a different combination of filters and information extraction steps,
a separate pipeline has to be designed for every input. We plan to first separately recreate the 
recommended workflows and then combine them into a complete package. 

# Automation
A substantial part of this project targets improvements to user-friendliness. Our goal is to create a smart
environment, which streamlines the pre-processing steps by autonomously selecting and suggesting the most 
appropriate tools.

### Detectors.js
A file containing functions for preliminary data analysis. Once any table is uploaded to [Datagrok](https://datagrok.ai),
this script decides whether the BioSignals package should be added to the '*Algorithms*' list. Currently,
the proposed mechanism relies on column labels, however its functionality can be extended to draw insights from actual data.

### Types of auto-input
By design all the inputs could be split into three sub-types:

* **User input:** completely manual (for areas where no inferences from data can be made);
* **Auto suggest:** completely automated (input suggestions inferred from data);
* **Auto Limit:** automatically limit the options, given previous choices;

The pipeline can then be viewed as a branching decision tree, which offers and/or block certain paths depending on 
retrieved metadata and the sequence of inputs.